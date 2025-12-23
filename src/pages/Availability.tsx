// src/pages/Availability.tsx

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
// Assuming you have a useToast hook (like shadcn/ui)
import { useToast } from "@/components/ui/use-toast";


const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// NOTE: We are removing mockAvailability and will fetch this data
// const mockAvailability: Record<string, "available" | "busy" | "limited"> = { ... }

const timeSlots = [
  { time: "08:00 - 10:00", available: true },
  { time: "10:00 - 12:00", available: true },
  { time: "12:00 - 14:00", available: false }, // Mocked as busy by default
  { time: "14:00 - 16:00", available: true },
  { time: "16:00 - 18:00", available: true },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// Helper to determine date status from API response
type DateStatus = "available" | "busy" | "limited";
type AvailabilityMap = Record<string, DateStatus>;


export default function Availability() {
  const { toast } = useToast();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);

  // 1. STATE FOR API DATA AND LOADING
  const [availabilityData, setAvailabilityData] = useState<AvailabilityMap>({});
  const [loading, setLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);


  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  };

  const formatDateKey = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const getDateStatus = (day: number): DateStatus => {
    const dateKey = formatDateKey(day);
    // 2. USE FETCHED DATA INSTEAD OF MOCK DATA
    return availabilityData[dateKey] || "available";
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleDateSelect = (dateKey: string) => {
    // We assume any date marked as 'busy' cannot be selected for time slots
    if (availabilityData[dateKey] === 'busy') return;

    setSelectedDate(dateKey);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  // 3. EFFECT HOOK TO FETCH AVAILABILITY FROM BACK-END
useEffect(() => {
    const fetchAvailability = async () => {
        setLoading(true);
        setSelectedDate(null); // Clear selection when month changes
        setSelectedTimeSlot(null);
        
        // Format the start and end dates of the current month
        const startDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`;
        const endDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${daysInMonth}`;
        
        try {
            // Fetch data from the back-end server running on port 3001 (via proxy)
            const response = await fetch(`/api/availability?start=${startDate}&end=${endDate}`);
            
            if (!response.ok) {
                throw new Error('Server error while fetching availability.');
            }
            
            const data: AvailabilityMap = await response.json();
            setAvailabilityData(data);
        } catch (error) {
            console.error("Failed to fetch calendar availability:", error);
            // 'toast' is used here, so it must be a dependency
            toast({ 
                title: "Error fetching availability",
                description: "Could not connect to the booking server.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };
    fetchAvailability();
  // 👇 CORRECTED DEPENDENCY ARRAY: Added 'daysInMonth' and 'toast'
}, [currentMonth, currentYear, daysInMonth, toast]); // Rerun when month/year changes

  // 4. FUNCTION TO HANDLE BOOKING API CALL
  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot) return;

    // Split the time slot string (e.g., "08:00 - 10:00")
    const [startTime, endTime] = selectedTimeSlot.split(' - ').map(t => t.trim());

    const bookingDetails = {
      date: selectedDate,
      startTime: startTime,
      endTime: endTime,
    };

    setIsBooking(true);
    try {
      // Call the booking endpoint
      const response = await fetch('/api/book-slot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        // This covers cases where the slot was busy or server error
        throw new Error('Booking failed. Slot may no longer be available.');
      }

      const result = await response.json();

      toast({
        title: "Booking Confirmed! 🎉",
        description: `Appointment booked for ${selectedDate} at ${selectedTimeSlot}.`,
      });

      // Optional: Re-fetch data to update the calendar display
      // The next month change will handle this, but for immediate feedback:
      // new Date() is only for forcing the effect to re-run, you'd need to manually trigger the fetch
      // setCurrentMonth(currentMonth); 

    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsBooking(false);
    }
  };


  return (
    <main>
      {/* Header (omitted for brevity) */}
      <section className="bg-secondary/30">
        <div className="container-custom section-padding pb-10">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
              My Availability
            </h1>
            <p className="text-lg text-muted-foreground">
              Check my availability and find a time that works for you.
              Click on a date to see available time slots.
            </p>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2 bg-card rounded-xl p-6 card-hover border border-border/50">
            {/* Calendar Header (omitted for brevity) */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth} disabled={loading}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} disabled={loading}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Day Headers (omitted for brevity) */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
                <p className="ml-3 text-muted-foreground">Loading availability...</p>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before first of month (omitted for brevity) */}
                {Array.from({ length: firstDay }).map((_, index) => (
                  <div key={`empty-${index}`} className="aspect-square" />
                ))}

                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const dateKey = formatDateKey(day);
                  const status = getDateStatus(day);
                  const past = isPast(day);
                  const isDisabled = past || status === 'busy';

                  return (
                    <button
                      key={day}
                      disabled={isDisabled}
                      onClick={() => !isDisabled && handleDateSelect(dateKey)}
                      className={cn(
                        "aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all",
                        isDisabled && "opacity-40 cursor-not-allowed",
                        !isDisabled && "hover:bg-secondary cursor-pointer",
                        isToday(day) && "ring-2 ring-accent",
                        selectedDate === dateKey && "bg-accent text-accent-foreground",
                        selectedDate !== dateKey && status === "available" && "bg-green-50 text-green-700",
                        selectedDate !== dateKey && status === "limited" && "bg-amber-50 text-amber-700",
                        selectedDate !== dateKey && status === "busy" && "bg-red-50 text-red-700"
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            )}


            {/* Legend (omitted for brevity) */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-green-50 border border-green-200" />
                <span className="text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-amber-50 border border-amber-200" />
                <span className="text-muted-foreground">Limited</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded bg-red-50 border border-red-200" />
                <span className="text-muted-foreground">Busy</span>
              </div>
            </div>
          </div>

          {/* Time Slots */}
          <div className="bg-card rounded-xl p-6 card-hover border border-border/50 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold">Time Slots</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedDate
                    ? new Date(selectedDate).toLocaleDateString("en-ZA", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })
                    : "Select a date"}
                </p>
              </div>
            </div>

            {selectedDate ? (
              <div className="space-y-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    // Use mock 'available' status for slots for now
                    onClick={() => slot.available && handleTimeSlotSelect(slot.time)}
                    disabled={!slot.available}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border w-full transition-all",
                      slot.available
                        ? "border-green-200 bg-green-50 hover:shadow-md cursor-pointer"
                        : "border-border bg-secondary/50 opacity-60 cursor-not-allowed",
                      selectedTimeSlot === slot.time && "ring-2 ring-offset-2 ring-accent border-accent"
                    )}
                  >
                    <span className="font-medium text-sm">{slot.time}</span>
                    {slot.available ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Open
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <XCircle className="h-3 w-3 mr-1" />
                        Booked
                      </Badge>
                    )}
                  </button>
                ))}
                {/* 5. Update button to use the new handler */}
                <Button
                  variant="accent"
                  className="w-full mt-4"
                  onClick={handleBooking}
                  disabled={!selectedTimeSlot || isBooking}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    `Book This Time (${selectedTimeSlot ? selectedTimeSlot : 'Select Slot'})`
                  )}
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                Click on a date in the calendar to see available time slots.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}