import StatusBar from "./StatusBar";
import BottomNav from "./BottomNav";
import VoiceFAB from "./VoiceFAB";

export default function AppShell({ children }) {
  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-[428px] flex-col bg-background">
      <StatusBar />

      <main className="relative flex-1 overflow-x-hidden pb-24 pt-[52px]">
        {children}
      </main>

      <VoiceFAB />
      <BottomNav />
    </div>
  );
}
