import { Helmet } from "react-helmet";
import Header from "../Header";
import { useDarkMode } from "../../hooks/useDarKMode";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

export default function MainLayout({
  children,
  title,
  description,
  keywords,
  author,
}: LayoutProps): JSX.Element {
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <div
        className={`min-h-screen flex flex-col items-center ${
          isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
        }`}
      >
        <Header title="Critical Events Finder" />
        <main className="flex-grow p-4">{children}</main>
      </div>
    </>
  );
}
