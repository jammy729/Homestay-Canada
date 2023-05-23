import "../scss/root.scss";
import Header from "../component/header";
import Footer from "../component/footer";

export const metadata = {
  title: "밴쿠버 홈 스테이/렌탈",
  description: "밴쿠버 홈 스테이/렌탈 - Vancouver HomeStay/Rental",
  openGraph: {
    title: "밴쿠버 홈 스테이/렌탈",
    description: "밴쿠버 홈 스테이/렌탈 - Vancouver HomeStay/Rental",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header></Header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
