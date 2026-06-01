"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * The cartoon cloud face that follows the cursor with its pupils and
 * closes its eyes (look-away) when `isTyping` is true. Extracted so it can be
 * reused on its own (e.g. above a contact form).
 */
export function WatchingCloud({ isTyping = false }: { isTyping?: boolean }) {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const offsetX = (cursor.x / window.innerWidth - 0.5) * 40;
    setEyePos({ x: offsetX, y: 0 });
  }, [cursor]);

  // Blinking every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[160px] w-[280px]">
      <img
        src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/cloud.jpg"
        alt="cartoon cloud"
        className="h-full w-full object-contain"
      />

      {["left", "right"].map((side, idx) => (
        <div
          key={side}
          className="absolute flex items-end justify-center overflow-hidden"
          style={{
            top: 60,
            left: idx === 0 ? 80 : 150,
            width: 28,
            height: isTyping ? 4 : blink ? 6 : 40,
            borderRadius: isTyping || blink ? "2px" : "50% / 60%",
            backgroundColor: isTyping ? "black" : "white",
            transition: "all 0.15s ease",
          }}
        >
          {!isTyping && (
            <div
              className="bg-black"
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                marginBottom: 4,
                transform: `translate(${eyePos.x}px, 0px)`,
                transition: "all 0.1s ease",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function CloudWatchForm() {
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-xl border bg-white/30 p-8 shadow-xl backdrop-blur-md">
        {/* Cartoon Face */}
        <WatchingCloud isTyping={isTyping} />

        {/* Form */}
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col">
            <Label>Name</Label>
            <Input placeholder="Your Name" />
          </div>
          <div className="flex flex-col">
            <Label>Email</Label>
            <Input type="email" placeholder="Your Email" />
          </div>
          <div className="flex flex-col">
            <Label>Username</Label>
            <Input placeholder="Username" />
          </div>
          <div className="flex flex-col">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Password"
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
            />
          </div>
          <Button className="mt-2 w-full">Submit</Button>
        </div>
      </div>
    </div>
  );
}
