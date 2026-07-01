import Link from "next/link";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="mt-24 bg-espresso text-cream">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2">
              <Logo size={40} />
              <span className="font-display text-xl font-bold">brewdbro</span>
            </div>
            <p className="mt-3 font-display text-lg font-extrabold uppercase tracking-[0.2em] text-flame">
              Just Brew It Bro!
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Café-grade iced coffee at home — in a cup so good you keep it.
              Made by Team 19, Future Founders @ Mesa School of Business.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol title="Shop">
              <FooterLink href="/shop">All products</FooterLink>
              <FooterLink href="/product/the-keep-the-cup-combo">The Combo</FooterLink>
              <FooterLink href="/product/premium-instant-coffee">Coffee</FooterLink>
            </FooterCol>
            <FooterCol title="Brand">
              <FooterLink href="/our-story">Our story</FooterLink>
              <FooterLink href="/shop">Gifting</FooterLink>
            </FooterCol>
            <FooterCol title="Connect">
              <FooterLink href="#">Instagram</FooterLink>
              <FooterLink href="#">WhatsApp</FooterLink>
            </FooterCol>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/15 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} BrewdBro. Keep the cup.</p>
          <p className="font-mono">Made in India · Pay with UPI</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mono-label text-cream/50">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-cream/80 transition hover:text-white">
        {children}
      </Link>
    </li>
  );
}
