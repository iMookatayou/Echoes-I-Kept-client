import BrandIcon from "./ui/BrandIcon";

function Footer() {
  return (
    <footer className="bg-[#EFEEEB] border-t border-[#D9D8D4] px-8 py-10 md:py-14">
      <div className="flex flex-col items-center gap-4">
        <span className="text-sm tracking-widest uppercase text-[#4A4945]">
          Get in touch
        </span>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/techin-jetsribumrung-9a4069364/"
            className="text-[#4A4945] transition-opacity hover:opacity-50"
            aria-label="LinkedIn"
          >
            <BrandIcon
              src="/figma-assets/LinkedIN_black.svg"
              className="h-10 w-10"
            />
          </a>
          <a
            href="https://github.com/iMookatayou"
            className="text-[#4A4945] transition-opacity hover:opacity-50"
            aria-label="GitHub"
          >
            <BrandIcon
              src="/figma-assets/Github_black.svg"
              className="h-10 w-10"
            />
          </a>
          <a
            href="mailto:jetsribumrungtechin@gmail.com"
            className="text-[#4A4945] transition-opacity hover:opacity-50"
            aria-label="Email"
          >
            <BrandIcon
              src="/figma-assets/Google_black.svg"
              className="h-10 w-10"
            />
          </a>
        </div>
        <p className="text-sm text-[#4A4945] tracking-wide mt-2">
          © {new Date().getFullYear()} Techin B. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;
