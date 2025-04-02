/*
File: Description Header  Title
Description: This creates a context provider for authentication.
*/

import React from "react";

interface DescriptionSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  title,
  subtitle,
  description,
}) => {
  return (
    <div className="mb-10 text-center">
      <p className="text-gray-700 text-lg font-semibold uppercase">
        {subtitle}
      </p>
      <p className="text-4xl font-bold text-gray-900">{title}</p>
      <p className="text-lg font-normal text-gray-500 mx-auto w-full px-4 lg:w-1/2 py-4">
        {description}
      </p>
    </div>
  );
};

export default DescriptionSection;
