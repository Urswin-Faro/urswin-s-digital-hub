import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Mock availability data - in real app this would come from backend
const mockAvailability: Record<string, "available" | "busy" | "limited"> = {
  "2025-12-09": "available",
  "2025-12-10": "available",
  "2025-12-11": "limited",
  "2025-12-12": "available",
  "2025-12-13": "busy",
  "2025-12-16": "available",
  "2025-12-17": "available",
  "2025-12-18": "available",
  "2025-12-19": "limited",
  "2025-12-20": "available",
  "2025-12-23": "busy",
  "2025-12-24": "busy",
  "2025-12-25": "busy",
  "2025-12-26": "busy",
  "2025-12-27": "available",
  "2025-12-30": "available",
  "2025-12-31": "limited",
};

const timeSlots = [
  { time: "08:00 - 10:00", available: true },
  { time: "10:00 - 12:00", available: true },
  { time: "12:00 - 14:00", available: false },
  { time: "14:00 - 16:00", available: true },
  { time: "16:00 - 18:00", available: true },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function Availability() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const formatDateKey = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const getDateStatus = (day: number) => {
    const dateKey = formatDateKey(day);
    return mockAvailability[dateKey] || "available";
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

  return (
    <main>
      {/* Header */}
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
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-bold">
                {MONTHS[currentMonth]} {currentYear}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Day Headers */}
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
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before first of month */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="aspect-square" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dateKey = formatDateKey(day);
                const status = getDateStatus(day);
                const past = isPast(day);

                return (
                  <button
                    key={day}
                    disabled={past}
                    onClick={() => !past && setSelectedDate(dateKey)}
                    className={cn(
                      "aspect-square rounded-lg flex flex-col items-center justify-center text-sm font-medium transition-all",
                      past && "opacity-40 cursor-not-allowed",
                      !past && "hover:bg-secondary cursor-pointer",
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

            {/* Legend */}
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
                  <div
                    key={slot.time}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border",
                      slot.available
                        ? "border-green-200 bg-green-50"
                        : "border-border bg-secondary/50"
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
                  </div>
                ))}
                <Button variant="accent" className="w-full mt-4" asChild>
                  <a href={`/contact?date=${selectedDate}`}>Book This Date</a>
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
