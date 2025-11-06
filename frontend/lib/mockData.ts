// lib/mockData.ts

import { Board, List, Card } from "./types"; // Assuming you define your interfaces in lib/types.ts
// If you're using JavaScript/JSX, you can omit the explicit types

export const mockBoardData: Board = {
  id: 'board-1',
  name: 'Next.js Trello Clone Development',
  ownerId: 'user-123',
  lists: [
    // --- LIST 1: TO DO ---
    {
      id: 'list-1',
      title: '✅ To Do',
      boardId: 'board-1',
      order: 1,
      cards: [
        {
          id: 'card-1',
          title: 'Setup Next.js and TailwindCSS',
          description: 'Complete the initial setup and configuration.',
          listId: 'list-1',
          order: 1,
          assignedTo: ['user-a'],
        },
        {
          id: 'card-2',
          title: 'Design Data Structure (Board, List, Card)',
          description: 'Finalize the TypeScript interfaces.',
          listId: 'list-1',
          order: 2,
          assignedTo: ['user-b', 'user-c'],
        },
        {
          id: 'card-3',
          title: 'Implement Drag-and-Drop Library',
          description: 'Research and integrate react-beautiful-dnd or similar library.',
          listId: 'list-1',
          order: 3,
        },
      ],
    },
    
    // --- LIST 2: IN PROGRESS ---
    {
      id: 'list-2',
      title: '⏳ In Progress',
      boardId: 'board-1',
      order: 2,
      cards: [
        {
          id: 'card-4',
          title: 'Build Board Layout Component',
          description: 'Create the main scrolling horizontal container.',
          listId: 'list-2',
          order: 1,
          assignedTo: ['user-a'],
        },
        {
          id: 'card-5',
          title: 'Create List Component with Styles',
          description: 'Style the columns and ensure vertical scrolling is correct.',
          listId: 'list-2',
          order: 2,
        },
      ],
    },

    // --- LIST 3: DONE ---
    {
      id: 'list-3',
      title: '🎉 Done',
      boardId: 'board-1',
      order: 3,
      cards: [
        {
          id: 'card-6',
          title: 'Project Kickoff Meeting',
          description: 'Finalize scope and technical requirements.',
          listId: 'list-3',
          order: 1,
          dueDate: new Date('2025-11-01'),
        },
      ],
    },
  ],
};