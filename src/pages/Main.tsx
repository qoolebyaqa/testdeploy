import { useEffect, useState } from "react";

function Main() {
  const [today, setToday] = useState(new Date())
  useEffect(() => {
    const nextMinute = setInterval(() => {
      setToday(new Date(today.setMinutes(today.getMinutes() + 1)))
    }, 60000)
    return () => {
      clearInterval(nextMinute)
    }
  }, [today])
  return ( <div className="w-screen h-screen flex items-center justify-center gap-4">
    <h1>Welcome to Lombard</h1>
    <p className="font-extrabold">Time: {today.toLocaleTimeString().slice(0, today.toLocaleTimeString().lastIndexOf(':'))}</p>
  </div> );
}

export default Main;