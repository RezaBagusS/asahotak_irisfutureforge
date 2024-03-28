import { useState, useEffect } from 'react';

interface StateTimeRemaining {
  minutes: number;
  seconds: number;
}

const CustCountdown = ({ targetDate, onCountdownEnd }: { targetDate: number; onCountdownEnd?: () => void }) => {
  const [timeRemaining, setTimeRemaining] = useState<StateTimeRemaining>({ minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      // Hitung menit dan detik tersisa
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      // Perbarui state
      setTimeRemaining({ minutes, seconds });

      // Periksa jika waktu habis
      if (difference <= 0) {
        clearInterval(interval);
        // Panggil callback onCountdownEnd jika tersedia
        onCountdownEnd?.();
      }
    }, 1000);

    // Hapus interval saat component unmount
    return () => clearInterval(interval);
  }, [targetDate, onCountdownEnd]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  return timeRemaining.minutes && timeRemaining.seconds ? (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2 text-custPrimary text-3xl font-bold">
        <div className="flex items-center gap-2">
          <span className="">{formatTime(timeRemaining.minutes)}</span>
        </div>
        <p>
          <span className="">:</span>
        </p>
        <div className="flex items-center gap-2">
          <span className="">{formatTime(timeRemaining.seconds)}</span>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-2xl font-bold text-custPrimary">Waktu Habis!</p>
  );
};

export default CustCountdown;
