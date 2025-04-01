
import React from 'react';
import { PixelButton } from './pixel-button';
import { ChevronRight, Trophy, Star } from 'lucide-react';

interface CourseNode {
  id: string;
  title: string;
  description?: string;
  unlocked: boolean;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'project' | 'challenge';
  xp: number;
}

interface CourseMapProps {
  courseName: string;
  courseIcon?: string;
  nodes: CourseNode[];
  currentNodeId?: string;
  onNodeSelect: (nodeId: string) => void;
}

export const CourseMap3D: React.FC<CourseMapProps> = ({
  courseName,
  courseIcon,
  nodes,
  currentNodeId,
  onNodeSelect
}) => {
  // Determine if a node should be accessible
  const isAccessible = (node: CourseNode, index: number) => {
    // First node is always accessible
    if (index === 0) return true;
    
    // If previous node is completed, this node is accessible
    const prevNode = nodes[index - 1];
    return prevNode.completed;
  };

  return (
    <div className="relative w-full min-h-[500px] bg-[url('/lovable-uploads/d98cc1f4-a7d5-475a-b052-0f55de4f75c7.png')] bg-cover bg-center py-8 rounded-none border-4 border-gray-800 overflow-hidden">
      {/* Course title */}
      <div className="absolute top-4 left-4 bg-gray-900/80 p-2 border-2 border-gray-700 z-10">
        <h2 className="text-2xl font-minecraft text-white uppercase">
          {courseIcon && <span className="mr-2">{courseIcon}</span>}
          {courseName}
        </h2>
      </div>
      
      {/* Progress path */}
      <div className="relative mx-auto w-[90%] mt-16">
        <div className="absolute left-0 top-1/2 w-full h-8 bg-amber-800 border-t-4 border-b-4 border-amber-900 transform -translate-y-1/2 z-0"></div>
        
        <div className="relative z-10 flex items-center justify-between">
          {nodes.map((node, index) => {
            const isActive = node.id === currentNodeId;
            const accessible = isAccessible(node, index);
            
            // Determine node appearance based on state
            let nodeClasses = "flex flex-col items-center";
            let iconClasses = "w-16 h-16 flex items-center justify-center border-4 mb-2 relative";
            let iconBg = "";
            
            if (node.completed) {
              iconBg = "bg-green-500 border-green-700 text-white";
            } else if (isActive) {
              iconBg = "bg-orange-500 border-orange-700 text-white animate-pulse";
            } else if (accessible) {
              iconBg = "bg-blue-500 border-blue-700 text-white";
            } else {
              iconBg = "bg-gray-700 border-gray-800 text-gray-400";
            }
            
            // Node type icon
            let nodeIcon = null;
            switch(node.type) {
              case 'lesson':
                nodeIcon = <span className="text-xl">📚</span>;
                break;
              case 'quiz':
                nodeIcon = <span className="text-xl">❓</span>;
                break;
              case 'project':
                nodeIcon = <span className="text-xl">🏗️</span>;
                break;
              case 'challenge':
                nodeIcon = <span className="text-xl">🎯</span>;
                break;
            }
            
            return (
              <div key={node.id} className={nodeClasses}>
                <div 
                  className={`${iconClasses} ${iconBg} cursor-pointer hover:translate-y-[-4px] transition-transform`}
                  onClick={() => accessible && onNodeSelect(node.id)}
                >
                  {nodeIcon}
                  
                  {/* Position indicator */}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full">
                    <div className="w-4 h-8 bg-amber-900 border-2 border-amber-950"></div>
                  </div>
                  
                  {/* XP indicator */}
                  {node.xp > 0 && (
                    <div className="absolute -top-3 -right-3 bg-yellow-400 border-2 border-yellow-600 rounded-none px-1 text-xs font-minecraft text-black">
                      +{node.xp} XP
                    </div>
                  )}
                </div>
                
                <span className={`text-center text-sm font-minecraft mt-4 px-2 py-1 ${node.completed ? 'bg-green-500 text-white' : (accessible ? 'bg-gray-800/80 text-white' : 'bg-gray-800/80 text-gray-400')}`}>
                  {node.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Active node details */}
      {currentNodeId && (
        <div className="absolute bottom-4 right-4 max-w-md bg-gray-900/90 border-4 border-gray-700 p-4 z-10">
          <h3 className="text-xl font-minecraft text-white mb-2">
            {nodes.find(n => n.id === currentNodeId)?.title}
          </h3>
          <p className="text-gray-300 font-minecraft text-sm mb-3">
            {nodes.find(n => n.id === currentNodeId)?.description || 'Complete this lesson to continue your journey!'}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-400 text-sm font-minecraft">
                +{nodes.find(n => n.id === currentNodeId)?.xp || 0} XP
              </span>
            </div>
            <PixelButton size="sm" className="flex items-center gap-1">
              Start
              <ChevronRight className="h-4 w-4" />
            </PixelButton>
          </div>
        </div>
      )}
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[url('/lovable-uploads/45021bdb-020e-4bbb-994c-a3ee3a2247bd.png')] bg-contain bg-no-repeat" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute top-12 right-12 w-16 h-16 bg-[url('/lovable-uploads/a1720fdf-6a93-4286-beb9-490341339f14.png')] bg-contain bg-no-repeat" style={{ imageRendering: 'pixelated' }}></div>
      <div className="absolute -right-8 bottom-20 w-20 h-20 bg-[url('/lovable-uploads/4a94efb7-b0d5-465d-8a6d-555d8d853904.png')] bg-contain bg-no-repeat" style={{ imageRendering: 'pixelated' }}></div>
    </div>
  );
};

export default CourseMap3D;
