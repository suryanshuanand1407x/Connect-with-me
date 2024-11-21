import React from 'react';
import { ScrollText } from 'lucide-react';
import type { Submission } from '../types';

interface AdminPanelProps {
  submissions: Submission[];
}

export function AdminPanel({ submissions }: AdminPanelProps) {
  if (submissions.length === 0) {
    return (
      <div className="text-center py-12">
        <ScrollText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No submissions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Submissions</h2>
      {submissions.map((submission, index) => (
        <div
          key={submission.id}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{submission.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{submission.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{submission.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Submitted</p>
              <p className="font-medium">{new Date(submission.timestamp).toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Idea</p>
            <p className="mt-1 text-gray-700">{submission.idea}</p>
          </div>
        </div>
      ))}
    </div>
  );
}