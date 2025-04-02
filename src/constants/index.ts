/*
File: index.ts settings
Description: Settings for the application, navbar and footer.
*/

// General
export const WebName = "MaiaLabs";
export const Description = "Authentication App Template for Next.js";
export const Creator = "Milan Kiele";
export const Keywords = ["Template", "Next.js", "Authentication", "Milan"];
export const CopyRight = `@${new Date().getFullYear()} ${WebName}. All Rights Reserved`;
export const LogoSVG = "/logo.svg";
export const Supportmail = "support@maialabs.net";

// Referal - Social Media Links
const DiscordLink = "https://discord.com";
const TwitchLink = "https://twitch.com";
const YoutubeLink = "https://youtube.com";
const GithubLink = "https://github.com";
const CompanyLink = "https://maialabs.net";
export { DiscordLink, TwitchLink, YoutubeLink, GithubLink, CompanyLink };

// Navbar
export const NavbarConfig = [
  {
    name: "Home",
    id: "/",
  },
];

// Footer
export const FooterContent = {
  sections: [
    {
      title: "General",
      links: [
        { label: "Home", href: "/" },
        { label: "Legal", href: "/legal" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Profile", href: "/auth/settings" },
        { label: "Register", href: "/auth/register" },
        { label: "Support", href: "/legal" },
      ],
    },
  ],
  bottomLinks: [{ label: "Legal Information", href: "/legal" }],
};
