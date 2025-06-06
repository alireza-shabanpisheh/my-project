import { defineStore } from 'pinia'

import p1 from '../assets/images/p1.png'
import p2 from '../assets/images/p2.png'
import p3 from '../assets/images/p3.png'
import p4 from '../assets/images/p4.png'
import p5 from '../assets/images/p5.png'


export const useSitesStore = defineStore('sites', () => {
    // State
    const sites = ref([
        { url: 'https://landing-page-xi-blush-34.vercel.app/', thumbnail: p1, name: 'Solana Website Mockup' },
        { url: 'https://lighturngames.fun/', thumbnail: p2, name: 'lighturngames' },
        { url: 'https://mc-donald-s-corporation.vercel.app/', thumbnail: p3, name: 'McDonald Mockup' },
        { url: 'https://business-template-nine.vercel.app/', thumbnail: p4, name: 'Business Template' },
        { url: 'https://dashboard-admin-gamma-nine.vercel.app/', thumbnail: p5, name: 'Dashboard Admin Mockup' },
    ])

    return { sites }
})
