import React from 'react';
import cloudLeft from '@/assets/cloud-left.png';
import grassConfetti from '@/assets/grass-confetti.png';
import './intro.scss';

export default function Intro() {
  return (
    <>
      <div className="intro-container">
        <div className="intro-box">
          <div className="intro-title">WALL-BLOG</div>
          <div className="intro-desc">
            享受编程和技术所带来的快乐
            <br />
            Coding Your Ambition
          </div>
        </div>
        <img src={cloudLeft} className="cloud-left" alt="cloud-left" />
        <img
          src={grassConfetti}
          className="grass-confetti"
          alt="grass-confetti"
        />
      </div>
    </>
  );
}
