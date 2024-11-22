"use client";

const GradientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 filter blur-[150px]">
        <div className="absolute w-[50vh] h-[50vh] left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-1 opacity-50 mix-blend-hard-light animate-moveVertical"></div>
        <div className="absolute w-[70vh] h-[70vh] left-1/2 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-2 opacity-50 mix-blend-hard-light animate-moveInCircle origin-[-400px_center]"></div>
        <div className="absolute w-[50vh] h-[50vh] left-[10%] rounded-full bg-gradient-3 opacity-50 mix-blend-hard-light animate-moveInCircleReverse origin-[calc(50%+400px)]"></div>
        <div className="absolute w-[70vh] h-[70vh] top-1/2 left-2/3 rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-4 opacity-50 mix-blend-hard-light animate-moveHorizontal origin-[-200px_center]"></div>
        <div className="absolute w-[70vh] h-[70vh] rounded-full -translate-x-1/2 -translate-y-1/2 bg-gradient-5 opacity-50 mix-blend-hard-light animate-moveHorizontal origin-[-200px_center]"></div>

        <div className="absolute w-[70vh] h-[70vh] top-0 right-0 rounded-full translate-x-1/2 -translate-y-1/2 bg-gradient-5 opacity-50 mix-blend-hard-light origin-[-200px_center]"></div>
        <div className="absolute w-[70vh] h-[70vh] bottom-0 left-0 rounded-full -translate-x-1/2 translate-y-1/2 bg-gradient-1 opacity-50 mix-blend-hard-light origin-[-200px_center]"></div>
      </div>
    </div>
  );
};

export default GradientBackground;
