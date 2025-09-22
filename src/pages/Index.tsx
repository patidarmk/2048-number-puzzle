import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Trophy, Users, Zap, Sparkles, Star, Play, ArrowLeftRight as ArrowLeftRightIcon, RotateCcw as RotateCcwIcon } from 'lucide-react';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-6">
            2048 Puzzle
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            A classic sliding puzzle game with a modern twist. Combine tiles to reach the legendary 2048 tile!
          </p>
          
          <Link to="/game">
            <Button size="lg" className="text-xl px-10 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-xl rounded-full text-white group">
              <Play className="mr-2 group-hover:animate-pulse" size={24} />
              Play Now
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl text-white">
                  <Gamepad2 size={24} />
                </div>
                How to Play
              </CardTitle>
              <CardDescription>Master the mechanics to achieve high scores</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-lg mt-1">
                    <ArrowLeftRightIcon className="text-purple-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Swipe or Arrow Keys</h3>
                    <p className="text-slate-600">Move all tiles in one direction</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg mt-1">
                    <Zap className="text-amber-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Merge Tiles</h3>
                    <p className="text-slate-600">Tiles with same numbers combine</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg mt-1">
                    <Trophy className="text-green-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Reach 2048</h3>
                    <p className="text-slate-600">Win by creating the 2048 tile</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg mt-1">
                    <Star className="text-blue-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Score Points</h3>
                    <p className="text-slate-600">Earn points for each merge</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="bg-gradient-to-r from-indigo-500 to-pink-500 p-3 rounded-xl text-white">
                  <Sparkles size={24} />
                </div>
                Premium Features
              </CardTitle>
              <CardDescription>Enhanced gameplay experience</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg mt-1">
                    <Users className="text-indigo-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Multiple Grid Sizes</h3>
                    <p className="text-slate-600">Choose from 3x3 to 6x6 grids</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-cyan-100 p-2 rounded-lg mt-1">
                    <Zap className="text-cyan-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Smooth Animations</h3>
                    <p className="text-slate-600">Fluid movements and merging effects</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-rose-100 p-2 rounded-lg mt-1">
                    <RotateCcwIcon className="text-rose-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Limited Undo</h3>
                    <p className="text-slate-600">Reverse up to 3 moves</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg mt-1">
                    <Trophy className="text-amber-600" size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Score Tracking</h3>
                    <p className="text-slate-600">Best scores saved automatically</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <Trophy className="mx-auto text-yellow-500 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2 text-center">Achieve High Scores</h3>
            <p className="text-slate-600 text-center">Compete with yourself and beat your personal best scores</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <Users className="mx-auto text-green-500 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2 text-center">Multiple Grid Sizes</h3>
            <p className="text-slate-600 text-center">Choose from 3x3 to 6x6 grids for different challenges</p>
          </div>
          
          <div className="bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <Zap className="mx-auto text-blue-500 mb-4" size={48} />
            <h3 className="text-xl font-bold mb-2 text-center">Smooth Experience</h3>
            <p className="text-slate-600 text-center">Enjoy fluid animations and responsive controls</p>
          </div>
        </div>

        <div className="text-center pb-8">
          <MadeWithApplaa />
        </div>
      </div>
    </div>
  );
};

export default Index;