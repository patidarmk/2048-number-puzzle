import React, { useState } from 'react';
import GameBoard from '@/components/GameBoard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { Gamepad2, Trophy, Users, Zap, ArrowUpDown, ArrowLeftRight, RotateCcw } from 'lucide-react';

const Game = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const { toast } = useToast();

  const handleWin = () => {
    setGameStatus('won');
    toast({
      title: "Congratulations! 🎉",
      description: "You've reached 2048! You can continue playing to achieve higher scores.",
      duration: 5000,
    });
  };

  const handleGameOver = () => {
    setGameStatus('lost');
    toast({
      title: "Game Over 😢",
      description: "No more moves available. Try again!",
      variant: "destructive",
    });
  };

  const resetGame = () => {
    setGameStatus('playing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-2xl bg-white/80 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent py-2">
              2048 Puzzle
            </CardTitle>
            <CardDescription className="text-slate-600 text-lg">
              Join the numbers and get to the 2048 tile!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm rounded-xl p-3 shadow-sm">
                <span className="text-slate-700 font-medium flex items-center gap-2">
                  <Zap className="text-amber-500" size={20} />
                  Grid Size:
                </span>
                <Select value={gridSize.toString()} onValueChange={(value) => setGridSize(parseInt(value))}>
                  <SelectTrigger className="w-28 bg-white border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3x3</SelectItem>
                    <SelectItem value="4">4x4</SelectItem>
                    <SelectItem value="5">5x5</SelectItem>
                    <SelectItem value="6">6x6</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={resetGame} 
                className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg px-6 py-2 rounded-xl flex items-center gap-2"
              >
                <RotateCcw size={18} />
                New Game
              </Button>
            </div>
            
            <GameBoard 
              gridSize={gridSize} 
              onWin={handleWin} 
              onGameOver={handleGameOver} 
            />
            
            <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <Gamepad2 className="text-indigo-500" />
                How to Play
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <ArrowUpDown className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Swipe or Arrow Keys</h4>
                    <p className="text-slate-600 text-sm">Move tiles in any direction</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-lg">
                    <Zap className="text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Merge Tiles</h4>
                    <p className="text-slate-600 text-sm">Same numbers combine into one</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Trophy className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Reach 2048</h4>
                    <p className="text-slate-600 text-sm">Win by creating the 2048 tile</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-rose-100 p-2 rounded-lg">
                    <RotateCcw className="text-rose-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">Limited Undo</h4>
                    <p className="text-slate-600 text-sm">Use strategically to reverse moves</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-8">
          <MadeWithApplaa />
        </div>
      </div>
    </div>
  );
};

export default Game;