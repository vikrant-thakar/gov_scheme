"use client";
import React from "react";
import { Josefin_Sans } from 'next/font/google';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '700'], // Choose weights you need
  variable: '--font-josefin', // Optional: for CSS variable usage
});

const description = [
  "zycoon  is  a  National  Platform  that  aims  to  offer  one-stop  search  and  discovery  of  the  Government  schemes.",
  "It  provides  an  innovative ,  technology - based  solution  to  discover  scheme  information  based  upon  the  eligibility  of  the  citizen .",
  "The  platform  helps  the  citizen  to  find  the  right  Government  schemes  for  them .  It  also  guides  on  how  to  apply  for  different  Government  schemes .  Thus  no  need  to  visit  multiple  Government  websites.",
  "zycoon  platform  is  Developed , Managed ,  and  Operated  by  National  e - Governance  Division  (NeGD) ,  with  the  Support  of  Ministry  of  Electronics  and  Information  Technology  (MeitY) ,  Department  of  Administrative  Reforms  and  Public  Grievance  (DARPG)  and  in  partnership  with  other  Central  and  State  Ministries/Departments ."
];

export default function ZycoonDescription() {
  return (
    <div className={`${josefin.className} max-w-3xl mx-auto mt-12 mb-16 px-4 text-lg text-gray-200 space-y-6`}>
      {description.map((para, idx) => (
        <p key={idx} className="leading-relaxed flex flex-wrap gap-x-1 gap-y-2">
          {para.split(" ").map((word, widx) => (
            <span
              key={widx}
              className="inline-block transition-transform duration-200 hover:scale-110 cursor-pointer"
            >
              {word}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
} 