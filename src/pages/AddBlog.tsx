
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AddBlog = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto pt-32 pb-16 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Blog Management</CardTitle>
            <CardDescription>
              This is a static page for blog management. In a real implementation, 
              this would be a form for adding blog posts. Currently, blog content
              is hardcoded in the codebase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              To add or edit blog content, modify the relevant source code files directly.
              New blog posts should be added to the static blog data array.
            </p>
            <div className="bg-gray-100 p-4 rounded-md">
              <code className="text-sm">
                {`// Example of blog data structure
const blogPosts = [
  {
    id: 1,
    title: "10 Tips for Perfect Interior Painting",
    excerpt: "Learn the professional secrets to achieving flawless interior walls...",
    content: "Full article content here...",
    author: "John Painter",
    date: "2025-04-15",
    imageUrl: "/blog-image-1.jpg"
  },
  // Additional blog posts...
];`}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default AddBlog;
