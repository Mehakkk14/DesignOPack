import { 
  Building2, 
  Factory, 
  MapPin, 
  Phone, 
  Mail, 
  Award,
  Users,
  Target,
  Sparkles
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const values = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Every product reflects our commitment to excellence and attention to detail"
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Tailoring solutions to meet the unique needs of each brand we serve"
    },
    {
      icon: Target,
      title: "Precision Crafting",
      description: "Combining traditional craftsmanship with modern manufacturing techniques"
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Constantly evolving to bring fresh, creative packaging solutions"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary to-black">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          role="presentation"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')"
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4 animate-fade-in">
            About DesignOPack
          </h1>
          <p className="text-xl text-white/90 font-body max-w-2xl mx-auto animate-slide-up">
            Crafting Excellence in Hospitality Packaging Since Years
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto animate-fade-in">
            <p className="text-lg font-body leading-relaxed text-foreground mb-6">
              <strong className="font-heading text-primary">DesignOPack</strong> is a Delhi-based manufacturer specializing in customized luxury packaging and presentation products for the hospitality and corporate industries. We design and produce an exclusive range of items in <strong>Leatherette, Resin, Paper (Kraft/SBS), Kappa Board, Jute, Cane, Felt Fabric, and MDF Wood</strong> — all crafted to reflect premium quality and attention to detail.
            </p>

            <p className="text-lg font-body leading-relaxed text-foreground mb-6">
              With years of expertise, we've become a trusted partner for India's leading hotel chains, including <strong className="text-primary">Taj, Hyatt, Radisson, Fairmont, Sarovar</strong>, and many more. From elegant menu folders, trays, tissue boxes, bill folders, and room accessories to chocolate boxes, sweet boxes, pizza boxes, carry bags, and corporate hampers, every product is designed to enhance the brand experience of our clients.
            </p>

            <div className="bg-card p-8 rounded-lg my-12 border-l-4 border-primary">
              <p className="text-xl font-heading font-semibold text-foreground mb-4">
                "At DesignOPack, we believe that presentation is an art — and our products bring that art to life."
              </p>
              <p className="text-base font-body text-muted-foreground">
                Whether it's a five-star hotel, a boutique resort, or a corporate brand, we tailor every design to meet your aesthetic and functional needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="hover-lift animate-scale-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Icon className="text-primary" size={32} />
                    </div>
                    <h3 className="font-heading font-semibold text-xl mb-2 text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Details */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-foreground mb-12">
            Visit Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Office */}
            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Building2 className="text-primary" size={28} />
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-foreground">
                    Office Address
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="font-body text-foreground">
                      G-173, Dilshad Colony<br />
                      Delhi 110095
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary flex-shrink-0" size={20} />
                    <div className="font-body text-foreground">
                      <p>+91-9868176361</p>
                      <p>+91-8595555488</p>
                      <p>+91-9910211189</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary flex-shrink-0" size={20} />
                    <p className="font-body text-foreground">
                      designopackindia@gmail.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Factory */}
            <Card className="hover-lift">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Factory className="text-primary" size={28} />
                  </div>
                  <h3 className="font-heading font-semibold text-2xl text-foreground">
                    Factory Address
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1 flex-shrink-0" size={20} />
                    <p className="font-body text-foreground">
                      A-8, Basement, DSIDC Complex<br />
                      Jhilmil Industrial Area<br />
                      Delhi 110095
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="font-body text-muted-foreground">
              🌐 Website: <a href="https://www.designopack.com" className="text-primary hover:underline">www.designopack.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
