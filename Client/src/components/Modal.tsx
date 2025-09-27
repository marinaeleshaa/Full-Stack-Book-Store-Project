import React, {
  useState,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { IBook } from "../Interfaces";

interface ModalProps {
  isOpen: boolean;
  title: string;
  buttonText: string;
  onCloseModal: (state: boolean) => void;
  onSubmit: (data: IBook) => void;
  initialData?: Partial<IBook>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onCloseModal,
  title,
  buttonText,
  onSubmit,
  initialData,
}) => {
  const DummyBook = React.useMemo<IBook>(
    () => ({
      description: "",
      discountedPrice: null,
      oldPrice: null,
      title: "",
      Url: "",
      category: "action",
    }),
    []
  );

  const [formData, setFormData] = useState<IBook>({
    ...DummyBook,
    ...initialData,
  });

  // Important for pre fill
  useEffect(() => {
    setFormData({ ...DummyBook, ...initialData });
  }, [DummyBook, initialData]);

  if (!isOpen) return null;

  const onClose = () => {
    onCloseModal(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["oldPrice", "discountedPrice"].includes(name)
        ? Number(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl w-full max-w-lg mx-4 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400/40 via-blue-400/40 to-indigo-400/40"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-violet-400/5 to-blue-400/5 rounded-full blur-xl"></div>

        <div className="p-6 space-y-6 relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg p-2 transition-all duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="block text-white/90 font-medium text-sm">
                Book Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
                placeholder="Enter book title"
                required
              />
            </div>

            {/* Image URL Field */}
            <div className="space-y-2">
              <label className="block text-white/90 font-medium text-sm">
                Image URL
              </label>
              <input
                type="text"
                name="Url"
                value={formData.Url}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
                placeholder="Enter image URL"
                required
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="block text-white/90 font-medium text-sm">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all resize-none"
                rows={3}
                placeholder="Enter book description"
                required
              />
            </div>

            {/* Category Field - FIXED */}
            <div className="space-y-2">
              <label className="block text-white/90 font-medium text-sm">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.6)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6,9 12,15 18,9'/></svg>')] bg-no-repeat bg-right bg-[length:20px] pr-10"
                required
              >
                <option value="action" className="bg-gray-500/50  text-gray-700">
                  Action
                </option>
                <option value="drama" className="bg-gray-500/50  text-gray-700">
                  Drama
                </option>
                <option value="comedy" className="bg-gray-500/50  text-gray-700">
                  Comedy
                </option>
                <option value="romance" className="bg-gray-500/50  text-gray-700">
                  Romance
                </option>
                <option value="horror" className="bg-gray-500/50  text-gray-700">
                  Horror
                </option>
                <option value="sci-fi" className="bg-gray-500/50  text-gray-700">
                  Sci-Fi
                </option>
              </select>
            </div>

            {/* Price Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-white/90 font-medium text-sm">
                  Original Price
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice ?? 0}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-white/90 font-medium text-sm">
                  Discount Price
                </label>
                <input
                  type="number"
                  name="discountedPrice"
                  value={formData.discountedPrice ?? 0}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-400/50 transition-all"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 text-white font-semibold rounded-xl border border-violet-400/30 hover:border-violet-400/50 hover:bg-gradient-to-r hover:from-violet-500/30 hover:to-indigo-500/30 shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
              >
                {buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
