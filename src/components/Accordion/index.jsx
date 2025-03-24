"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useGSAP } from "@gsap/react"
import styles from "./style.module.scss"
import { accordionAnimation, gsapContentReveal } from "./animation"

// Static sample data integrated into the file
const workExperienceItems = [
    {
        title: "Dimension Data",
        subtitle: "Dimension Data Solutions East Africa Ltd, Kenya",
        date: "Project Management Intern (Jan 2022 - Sep 2022)",
        content: (
            <p>
                As Key Account Manager for a major financial institution, I worked closely with the client to identify and
                resolve challenges. I led a team of engineers in implementing effective network solutions, ensuring optimal
                functionality and performance. My role involved coordinating with multiple teams to deliver projects on time,
                ensuring client satisfaction and maintaining valuable business relationships.
            </p>
        ),
    },
    {
        title: "Little",
        subtitle: "CRAFT Mobile Ltd, Kenya",
        date: "Tech Team Intern (Jun 2020 - Aug 2021)",
        content: (
            <p>
                As Key Developer, I was tasked with building payment modules for a fintech solution catering to multiple
                markets across various mobile platforms. I worked alongside senior developers, designed APIs, and developed
                comprehensive payment solutions that integrated with multiple payment gateways. This role required strong
                attention to detail and a focus on creating a unified and smooth user experience.
            </p>
        ),
    },
    {
        title: "Fenix International",
        subtitle: "Kampala, Uganda (Remote)",
        date: "Student Consultancy (May 2020 - Apr 2021)",
        content: (
            <p>
                As a structured data consultant for Africa's foremost renewable energy and consumer financing company, I
                worked with the Digital PAYG product team. My team identified critical gaps and recommended targeted
                strategies to significantly reduce fraud and improve operational efficiency. I developed a comprehensive data
                analysis framework that enabled the company to make more informed decisions and enhance their financial
                reporting.
            </p>
        ),
    },
    {
        title: "Schmidt Futures Rise",
        subtitle: "NYC (Remote)",
        date: "Student Consultancy (Jun 2020 - Feb 2021)",
        content: (
            <p>
                As a specialized consultant, I crafted a comprehensive marketing strategy to build a growing partner
                ecosystem, helping to reach future-minded high school applicants in various locations across Africa. My team
                developed scalable brand assets and marketing materials that effectively communicated the program's value
                proposition to potential applicants and program partners. Additionally, we identified and recommended novel
                impact evaluation methods to establish a robust outcome and assessment framework.
            </p>
        ),
    },
    {
        title: "Talenteum",
        subtitle: "Port-Louis, Mauritius",
        date: "Student Consultancy (Oct 2019 - Dec 2019)",
        content: (
            <p>
                For Talenteum, a leading talent acquisition platform, I developed a comprehensive expansion strategy to
                support their growth ambitions. My team created a phased framework for market entry, identifying key
                partnerships and establishing metrics to evaluate progress. We presented our conclusions to the company's
                executive team, setting the stage for successful market entry and sustainable expansion.
            </p>
        ),
    },
]

const AccordionItem = ({ title, number, subtitle, date, content, isOpen, onClick }) => {
    const contentRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    useGSAP(() => {
        if (contentRef.current && isOpen) {
            gsapContentReveal(contentRef.current, true)
        }
    }, [isOpen])

    return (
        <div className={styles.accordionItem}>
            <motion.div
                className={`${styles.accordionHeader} ${isOpen ? styles.active : ""}`}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial="rest"
                animate={isHovered ? "hover" : isOpen ? "active" : "rest"}
                variants={accordionAnimation.headerHover}
            >
                <div className={styles.titleContainer}>
                    <h2>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>
                <motion.div className={styles.numberContainer} variants={accordionAnimation.numberIndicator}>
                    <span className={styles.number}>({number.toString().padStart(2, "0")})</span>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={styles.accordionContent}
                        ref={contentRef}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={accordionAnimation.content}
                    >
                        <motion.div
                            variants={accordionAnimation.staggerChildren}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className={styles.contentInner}
                        >
                            <motion.div className={styles.dateContainer} variants={accordionAnimation.contentItem}>
                                <p>{date}</p>
                            </motion.div>
                            <motion.div className={styles.contentText} variants={accordionAnimation.contentItem}>
                                {content}
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Accordion = () => {
    const [openIndex, setOpenIndex] = useState(null)

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className={styles.accordion}>
            <div className={styles.accordionTitle}>
                <h1>
                    Work Experience<sup>({workExperienceItems.length})</sup>
                </h1>
                <p className={styles.introText}>
                    I've gained hands-on experience solving real-world business challenges—and just learned a ton in return—
                    through five impactful internships and R&D-related collaborations over the past few years. Here's a brief
                    snapshot of the businesses that I've worked for and been a part of.
                </p>
            </div>

            {workExperienceItems.map((item, index) => (
                <div key={index} className={styles.itemWrapper}>
                    <AccordionItem
                        title={item.title}
                        number={index + 1}
                        subtitle={item.subtitle}
                        date={item.date}
                        content={item.content}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                    {index < workExperienceItems.length - 1 && <div className={styles.divider}></div>}
                </div>
            ))}
        </div>
    )
}

export default Accordion
