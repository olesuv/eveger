import Map from './components/Map';
import Navbar from './components/Navbvar';
import RecentEvents from './components/RecentEvents';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <RecentEvents />
        <Map />
      </main>
    </>
  );
}
