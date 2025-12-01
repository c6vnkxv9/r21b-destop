
import Footer from "../components/footer";
import Banner from "../components/index/banner";
import GameModeForm from "../components/index/form";
import DefaultLayout from "../layouts/DefaultLayout";

function HomeView(): JSX.Element {
  return (
    <DefaultLayout className="px-4 sm:px-6 lg:px-8 py-4">
      <Banner />
      <GameModeForm />
      <Footer />
    </DefaultLayout>
  );
}

export default HomeView;

