import { motion } from "framer-motion";

interface Skill {
  name: string;
  color: {
    bg: string;
    border: string;
    text: string;
  };
  rotation: number;
}

const skills: Skill[] = [
  { name: "Machine Learning", color: { bg: "rgba(233, 30, 122, 0.06)", border: "rgba(233, 30, 122, 0.15)", text: "#d81b60" }, rotation: -4 },
  { name: "Full-Stack Development", color: { bg: "rgba(124, 92, 191, 0.06)", border: "rgba(124, 92, 191, 0.15)", text: "#7c5cbf" }, rotation: 5 },
  { name: "Python", color: { bg: "rgba(37, 99, 235, 0.06)", border: "rgba(37, 99, 235, 0.15)", text: "#2563eb" }, rotation: -6 },
  { name: "Edge AI", color: { bg: "rgba(5, 150, 105, 0.06)", border: "rgba(5, 150, 105, 0.15)", text: "#059669" }, rotation: 3 },
  { name: "React", color: { bg: "rgba(8, 145, 178, 0.06)", border: "rgba(8, 145, 178, 0.15)", text: "#0891b2" }, rotation: -5 },
  { name: "FastAPI", color: { bg: "rgba(217, 119, 6, 0.06)", border: "rgba(217, 119, 6, 0.15)", text: "#d97706" }, rotation: 4 },
  { name: "Data Pipelines", color: { bg: "rgba(233, 30, 122, 0.06)", border: "rgba(233, 30, 122, 0.15)", text: "#d81b60" }, rotation: -3 },
  { name: "Embedded Systems", color: { bg: "rgba(5, 150, 105, 0.06)", border: "rgba(5, 150, 105, 0.15)", text: "#059669" }, rotation: 6 },
  { name: "IoT", color: { bg: "rgba(8, 145, 178, 0.06)", border: "rgba(8, 145, 178, 0.15)", text: "#0891b2" }, rotation: -4 },
  { name: "C/C++", color: { bg: "rgba(124, 92, 191, 0.06)", border: "rgba(124, 92, 191, 0.15)", text: "#7c5cbf" }, rotation: 3 },
  { name: "SQL", color: { bg: "rgba(37, 99, 235, 0.06)", border: "rgba(37, 99, 235, 0.15)", text: "#2563eb" }, rotation: -5 },
];

export default function SkillsCloud() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const itemVariants = (rotation: number) => ({
    hidden: { opacity: 0, y: 25, scale: 0.9, rotate: 0 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: rotation,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  });

  return (
    <div style={{ width: "100%", paddingBottom: "24px" }}>
      <div className="skills-title" style={{ marginBottom: "20px" }}>Core Skills</div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={itemVariants(skill.rotation)}
            whileHover={{
              scale: 1.08,
              rotate: 0,
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              borderColor: skill.color.text,
              backgroundColor: skill.color.bg.replace("0.06", "0.1"),
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            style={{
              padding: "10px 18px",
              backgroundColor: skill.color.bg,
              border: `1.5px solid ${skill.color.border}`,
              borderRadius: "50px",
              fontSize: "0.88rem",
              fontWeight: 500,
              color: skill.color.text,
              cursor: "default",
              whiteSpace: "nowrap",
              userSelect: "none",
            }}
          >
            {skill.name}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
