import { motion } from "framer-motion";

function MacroCard({ title, value, unit, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-cyan-500/20 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10"
    >
      <div className="text-2xl">{icon}</div>

      <h3 className="mt-3 text-gray-400">{title}</h3>

      <p className="mt-2 text-4xl font-bold text-white">
        {value}
        <span className="ml-1 text-xl text-gray-400">{unit}</span>
      </p>
    </motion.div>
  );
}

export default MacroCard;