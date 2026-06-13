import { Download, Smartphone, WifiOff } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import type { Translations } from '../lib/i18n';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

function isStandaloneApp() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in window.navigator && Boolean((window.navigator as Navigator & { standalone?: boolean }).standalone))
  );
}

type AppInstallPromptProps = {
  t: Translations;
};

export function AppInstallPrompt({ t }: AppInstallPromptProps) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandaloneApp);
  const [online, setOnline] = useState(navigator.onLine);

  const installLabel = useMemo(() => {
    if (installed) return t.runningAsApp;
    if (installEvent) return t.installApp;
    return t.appInstallStatus;
  }, [installEvent, installed, t]);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    }

    function handleInstalled() {
      setInstalled(true);
      setInstallEvent(null);
    }

    function handleOnline() {
      setOnline(true);
    }

    function handleOffline() {
      setOnline(false);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  async function installApp() {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted') setInstalled(true);
    setInstallEvent(null);
  }

  return (
    <div className="appStatusStrip" aria-label={t.appInstallStatus}>
      <span>
        <Smartphone size={16} aria-hidden="true" />
        {installLabel}
      </span>
      <span className={online ? 'onlineState' : 'offlineState'}>
        {online ? <Download size={16} aria-hidden="true" /> : <WifiOff size={16} aria-hidden="true" />}
        {online ? t.offlineReady : t.offlineNow}
      </span>
      {installEvent && !installed && (
        <button type="button" className="secondaryButton compactButton" onClick={installApp}>
          <Download size={16} aria-hidden="true" />
          {t.installApp}
        </button>
      )}
    </div>
  );
}
