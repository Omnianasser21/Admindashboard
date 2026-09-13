import { Cpu } from 'lucide-react';
import logo from "../../../assets/image/logo tech.png";


export function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="relative hidden flex-1 flex-col justify-between overflow-hidden bg-[#0B1220] p-10 text-white lg:flex">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 ">
            <img src={logo} alt="Logo" className="h-10 w-10 object-cover" />{" "}
          </div>
          <span className="text-lg font-semibold">Digital Mov</span>
        </div>

        <div className="relative">
          <h1 className="text-3xl font-bold leading-tight xl:text-4xl">
            Manage your digital experience.
          </h1>
          <p className="mt-3 max-w-md text-sm text-white/60">
            Content, media, and settings — all from one premium dashboard built
            for modern technology brands.
          </p>
        </div>

        <p className="relative text-xs text-white/40">
          © 2026 Digital Mov. All rights reserved.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center bg-background p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 ">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-10 object-cover"
              />{" "}
            </div>
            <span className="text-lg font-semibold text-text">Digital Mov</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
