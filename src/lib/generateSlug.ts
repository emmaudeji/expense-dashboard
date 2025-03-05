export const generateSlug = (name: string): string => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Remove duplicate hyphens
      .trim();
  
    const randomSuffix = Math.random().toString().slice(2, 7); // Generate 5 random digits
    return `${slug}-${randomSuffix}`;
  };
 
  