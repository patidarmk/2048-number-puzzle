import React, { useState, useEffect, useCallback, useRef } from 'react';
import Tile from './Tile';
import { Button } from '@/components/ui/button';
import { RotateCcw, Trophy, RotateCw, Undo2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';

interface TileType {
  id: number;
  value: number;
  x: number;
  y: number;
  isNew?: boolean;
  isMerged?: boolean;
}

interface GameBoardProps {
  gridSize: number;
  onWin: () => void;
  onGameOver: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gridSize, onWin, onGameOver }) => {
  const [tiles, setTiles] = useState<TileType[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [undoStack, setUndoStack] = useState<{ tiles: TileType[]; score: number }[]>([]);
  const [undoCount, setUndoCount] = useState(3);
  const { toast } = useToast();
  const gameBoardRef = useRef<HTMLDivElement>(null);

  // Initialize the game board
  const initializeBoard = useCallback(() => {
    const newTiles: TileType[] = [];
    setTiles(newTiles);
    setScore(0);
    setUndoStack([]);
    setUndoCount(3);
    addRandomTile(newTiles);
    addRandomTile(newTiles);
  }, []);

  // Add a random tile to the board
  const addRandomTile = (currentTiles: TileType[]) => {
    const emptyCells: { x: number; y: number }[] = [];
    
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        if (!currentTiles.some(tile => tile.x === x && tile.y === y)) {
          emptyCells.push({ x, y });
        }
      }
    }
    
    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4;
      const newTile: TileType = {
        id: Date.now(),
        value: newValue,
        x: randomCell.x,
        y: randomCell.y,
        isNew: true,
      };
      
      return [...currentTiles, newTile];
    }
    
    return currentTiles;
  };

  // Initialize the board on mount and when grid size changes
  useEffect(() => {
    initializeBoard();
    const savedBestScore = localStorage.getItem(`bestScore-${gridSize}`);
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore, 10));
    }
  }, [gridSize, initializeBoard]);

  // Save best score to localStorage
  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem(`bestScore-${gridSize}`, score.toString());
    }
  }, [score, bestScore, gridSize]);

  // Move tiles in a direction
  const moveTiles = (direction: 'up' | 'down' | 'left' | 'right') => {
    // Save current state for undo
    setUndoStack(prev => [...prev.slice(-4), { tiles: [...tiles], score }]);
    
    const newTiles = [...tiles];
    let moved = false;
    let newScore = score;
    
    // Reset tile states
    newTiles.forEach(tile => {
      tile.isNew = false;
      tile.isMerged = false;
    });
    
    // Sort tiles based on direction to process in correct order
    const sortedTiles = [...newTiles].sort((a, b) => {
      if (direction === 'up') return a.y - b.y;
      if (direction === 'down') return b.y - a.y;
      if (direction === 'left') return a.x - b.x;
      if (direction === 'right') return b.x - a.x;
      return 0;
    });
    
    // Process movement
    for (const tile of sortedTiles) {
      let newX = tile.x;
      let newY = tile.y;
      let canMove = true;
      
      // Move in the specified direction until boundary or another tile
      while (canMove) {
        let nextX = newX;
        let nextY = newY;
        
        if (direction === 'up') nextY--;
        if (direction === 'down') nextY++;
        if (direction === 'left') nextX--;
        if (direction === 'right') nextX++;
        
        // Check if within bounds
        if (nextX < 0 || nextX >= gridSize || nextY < 0 || nextY >= gridSize) {
          canMove = false;
          break;
        }
        
        // Check if there's a tile in the next position
        const targetTile = newTiles.find(t => t.x === nextX && t.y === nextY);
        
        if (targetTile) {
          // If same value and not already merged, merge them
          if (targetTile.value === tile.value && !targetTile.isMerged) {
            // Remove the target tile
            const targetIndex = newTiles.findIndex(t => t.x === nextX && t.y === nextY);
            newTiles.splice(targetIndex, 1);
            
            // Update current tile
            tile.value *= 2;
            tile.isMerged = true;
            newScore += tile.value;
            
            // Check for win condition
            if (tile.value === 2048) {
              onWin();
            }
          }
          canMove = false;
        } else {
          // Move to empty space
          newX = nextX;
          newY = nextY;
          moved = true;
        }
      }
      
      // Update tile position if it moved
      if (tile.x !== newX || tile.y !== newY) {
        tile.x = newX;
        tile.y = newY;
        moved = true;
      }
    }
    
    // If any tile moved, add a new tile
    if (moved) {
      const updatedTiles = addRandomTile(newTiles);
      setTiles(updatedTiles);
      setScore(newScore);
      
      // Check for game over
      if (isGameOver(updatedTiles)) {
        onGameOver();
      }
    }
  };

  // Check if game is over
  const isGameOver = (currentTiles: TileType[]) => {
    // If there's an empty cell, game is not over
    if (currentTiles.length < gridSize * gridSize) return false;
    
    // Check if any adjacent tiles have the same value
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const tile = currentTiles.find(t => t.x === x && t.y === y);
        if (!tile) continue;
        
        // Check right neighbor
        if (x < gridSize - 1) {
          const rightTile = currentTiles.find(t => t.x === x + 1 && t.y === y);
          if (rightTile && rightTile.value === tile.value) return false;
        }
        
        // Check bottom neighbor
        if (y < gridSize - 1) {
          const bottomTile = currentTiles.find(t => t.x === x && t.y === y + 1);
          if (bottomTile && bottomTile.value === tile.value) return false;
        }
      }
    }
    
    return true;
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for arrow keys to avoid page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        
        if (e.key === 'ArrowUp') moveTiles('up');
        else if (e.key === 'ArrowDown') moveTiles('down');
        else if (e.key === 'ArrowLeft') moveTiles('left');
        else if (e.key === 'ArrowRight') moveTiles('right');
      }
    };
    
    // Add event listener to the window
    window.addEventListener('keydown', handleKeyDown);
    
    // Focus the game board on mount to ensure it can receive keyboard events
    if (gameBoardRef.current) {
      gameBoardRef.current.focus();
    }
    
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [tiles]);

  // Undo last move
  const handleUndo = () => {
    if (undoCount > 0 && undoStack.length > 0) {
      const prevState = undoStack[undoStack.length - 1];
      setTiles(prevState.tiles);
      setScore(prevState.score);
      setUndoStack(prev => prev.slice(0, -1));
      setUndoCount(prev => prev - 1);
      toast({
        title: "Undo used",
        description: `${undoCount - 1} undos remaining`,
      });
    } else {
      toast({
        title: "Cannot undo",
        description: "No more undos available",
        variant: "destructive",
      });
    }
  };

  // Touch handling for swipe gestures
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;
      
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;
      
      // Determine swipe direction based on greatest distance
      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal swipe
        if (diffX > 50) moveTiles('left');
        else if (diffX < -50) moveTiles('right');
      } else {
        // Vertical swipe
        if (diffY > 50) moveTiles('up');
        else if (diffY < -50) moveTiles('down');
      }
      
      touchStartX = 0;
      touchStartY = 0;
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [tiles]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div className="flex justify-between w-full mb-6">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg flex-1 mx-1">
          <CardContent className="p-3 text-center">
            <div className="text-indigo-100 text-sm font-medium">SCORE</div>
            <div className="text-2xl font-bold">{score}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg flex-1 mx-1">
          <CardContent className="p-3 text-center">
            <div className="text-amber-100 text-sm font-medium">BEST</div>
            <div className="text-2xl font-bold">{bestScore}</div>
          </CardContent>
        </Card>
        <Button 
          onClick={handleUndo} 
          disabled={undoCount === 0}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg flex-1 mx-1 flex items-center justify-center gap-2"
        >
          <Undo2 size={18} />
          <span className="hidden sm:inline">Undo ({undoCount})</span>
          <span className="sm:hidden">{undoCount}</span>
        </Button>
      </div>
      
      <div 
        ref={gameBoardRef}
        tabIndex={0}
        className="relative bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl p-3 w-full aspect-square outline-none shadow-xl border border-slate-300/50"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          gap: '6px',
        }}
      >
        {/* Render grid cells */}
        {Array.from({ length: gridSize * gridSize }).map((_, index) => (
          <div 
            key={index} 
            className="bg-slate-200/80 rounded-xl shadow-inner"
          />
        ))}
        
        {/* Render tiles */}
        {tiles.map(tile => (
          <Tile 
            key={tile.id} 
            value={tile.value} 
            x={tile.x} 
            y={tile.y}
            isNew={tile.isNew}
            isMerged={tile.isMerged}
          />
        ))}
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-3 w-full">
        <Button 
          onClick={() => moveTiles('up')} 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg w-16 h-16 rounded-full"
          aria-label="Move up"
        >
          <RotateCw className="rotate-180" size={24} />
        </Button>
        
        <div className="flex gap-4">
          <Button 
            onClick={() => moveTiles('left')} 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg w-16 h-16 rounded-full"
            aria-label="Move left"
          >
            <RotateCw className="-rotate-90" size={24} />
          </Button>
          
          <Button 
            onClick={initializeBoard} 
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-lg w-16 h-16 rounded-full flex items-center justify-center"
            aria-label="Restart game"
          >
            <Trophy size={24} />
          </Button>
          
          <Button 
            onClick={() => moveTiles('right')} 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg w-16 h-16 rounded-full"
            aria-label="Move right"
          >
            <RotateCw className="rotate-90" size={24} />
          </Button>
        </div>
        
        <Button 
          onClick={() => moveTiles('down')} 
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg w-16 h-16 rounded-full"
          aria-label="Move down"
        >
          <RotateCw size={24} />
        </Button>
      </div>
    </div>
  );
};

export default GameBoard;