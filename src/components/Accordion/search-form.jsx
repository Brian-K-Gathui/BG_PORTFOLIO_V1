"use client"

import { useState } from "react"
import styles from './style.module.scss'

export function SearchForm() {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        // Implement your search logic here
        console.log("Searching for:", searchTerm)
    }

    return (
        <form onSubmit={handleSubmit} className={styles.searchForm}>
            <input
                type="text"
                placeholder="Search experiences..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
                Search
            </button>
        </form>
    )
}
