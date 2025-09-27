function HeroSection({ title }: { title: string }) {
  return (
    <div className=" text-center flex items-center justify-center mt-20 py-12 h-[40vh]">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
          {title}
        </h1>
        <p className="text-lg text-zinc-300 mb-6">
          A compelling and concise description of your product or service.
          Highlight key benefits or features.
        </p>
        <div className="space-x-3">
          <button
            type="button"
            className="p-4 mt-10 self-end rounded-2xl font-semibold text-white bg-gradient-to-r from-violet-500/20 to-indigo-500/20 backdrop-blur-md border border-violet-300/30 hover:border-violet-300/50 hover:bg-gradient-to-r hover:from-violet-500/30 hover:to-indigo-500/30 shadow-2xl hover:shadow-violet-500/20 hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Show Books
          </button>
          <button className="p-4 mt-10 self-end rounded-2xl font-semibold text-white  backdrop-blur-md border border-violet-300/30 hover:border-violet-300/50 hover:bg-gradient-to-r hover:from-slate-600/30 hover:to-slate-400/30 shadow-2xl hover:shadow-slate-500/20 hover:scale-105 transition-all duration-300 ease-in-out">
            Secondary CTA
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
