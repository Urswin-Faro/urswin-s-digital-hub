import { Download, CheckCircle2, Briefcase, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const skills = {
  tech: [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Database Design",
    "API Development",
    "UI/UX Design",
    "Git",
  ],
  homeTasks: [
    "Interior Painting",
    "Garden Maintenance",
    "Minor Repairs",
    "Bin Cleaning",
    "General Handywork",
  ],
  errands: [
    "Grocery Shopping",
    "Package Delivery",
    "Queueing Services",
    "Item Collection",
    "Personal Shopping",
  ],
};

const experience = [
  {
    title: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2021 - Present",
    description:
      "Building custom web applications and providing technical consulting for small businesses.",
  },
  {
    title: "Junior Software Developer",
    company: "Tech Solutions Inc.",
    period: "2019 - 2021",
    description: "Developed and maintained web applications using React and Node.js.",
  },
  {
    title: "IT Support Technician",
    company: "Digital Services Co.",
    period: "2017 - 2019",
    description:
      "Provided technical support and troubleshooting for software and hardware issues.",
  },
];

const strengths = [
  "Reliable and punctual",
  "Excellent communication skills",
  "Detail-oriented approach",
  "Quick learner",
  "Problem-solving mindset",
  "Customer-focused service",
];

export default function About() {
  return (
    <main>
      {/* Header */}
      <section className="bg-secondary/30">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar */}
              <div className="w-40 h-40 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src="./public/UrswinPP.jpg"
                  alt="Urswin Faro"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2">
                  Urswin Faro
                </h1>
                <p className="text-lg text-accent font-medium mb-4">
                  Entrepreneur & Service Provider
                </p>
                <p className="text-muted-foreground max-w-xl mb-6">
                  I'm a versatile professional based in Cape Town, South Africa, offering quality
                  tech products alongside a range of personal and professional services. With a
                  background in technology and a passion for helping others, I strive to deliver
                  excellent service in everything I do.
                </p>
                <a
                  href="/Urswin_Faro_CV.pdf" // Point to the file in the public folder
                  download="Urswin_Faro_CV.pdf" // Suggests a download filename
                  target="_blank" // Optional: Opens link in a new tab
                >
                  <Button variant="accent" size="lg" asChild>
                    <span className="flex items-center">
                      <Download className="h-4 w-4 mr-2" />
                      Download CV
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="container-custom section-padding">
        <h2 className="font-serif text-3xl font-bold mb-8">Skills & Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tech Skills */}
          <div className="bg-card rounded-xl p-6 card-hover border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <GraduationCap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-4">Tech Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tech.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Home Tasks */}
          <div className="bg-card rounded-xl p-6 card-hover border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-4">Home Tasks</h3>
            <div className="flex flex-wrap gap-2">
              {skills.homeTasks.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Errands */}
          <div className="bg-card rounded-xl p-6 card-hover border border-border/50">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-serif text-xl font-semibold mb-4">Errands</h3>
            <div className="flex flex-wrap gap-2">
              {skills.errands.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="bg-secondary/30">
        <div className="container-custom section-padding">
          <h2 className="font-serif text-3xl font-bold mb-8">Experience</h2>

          <div className="space-y-6 max-w-3xl">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 pb-6 border-l-2 border-border last:pb-0"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-accent" />
                <div className="bg-card rounded-xl p-6 card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-semibold">{exp.title}</h3>
                    <Badge variant="outline">{exp.period}</Badge>
                  </div>
                  <p className="text-accent font-medium text-sm mb-2">{exp.company}</p>
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="container-custom section-padding">
        <h2 className="font-serif text-3xl font-bold mb-8">My Strengths</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {strengths.map((strength) => (
            <div
              key={strength}
              className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50"
            >
              <CheckCircle2 className="h-5 w-5 text-accent shrink-0" />
              <span className="font-medium">{strength}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}