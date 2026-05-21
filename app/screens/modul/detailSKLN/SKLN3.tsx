// app/screens/course/SKLN3.tsx

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// --- KONSTANTA WARNA BRANDING MK ---
const PRIMARY_COLOR = "#8B0000"; // Merah Tua/Maroon
const ACCENT_BLUE = "#007AFF";    // Biru (Aksen)
const BACKGROUND_LIGHT = "#F8F8F8"; 
const CARD_COLOR = "#FFFFFF";       
const TEXT_DARK = "#222222";

// --- DATA DUMMY SKLN ANGKATAN 3 ---
const COURSE_DATA = {
    // Judul disesuaikan untuk SKLN Angkatan 3
    title: "Bimbingan Teknis Hukum Acara Sengketa Kewenangan Lembaga Negara (SKLN) Angkatan 3", 
    category: "Bimtek SKLN",
    modules: 11, 
    hours: 30,  
    participants: 229, 
    lastUpdate: "12/2024",
    organizer: "Pusat Pendidikan Pancasila dan Konstitusi MKRI",
    prerequisites: "Tidak ada persyaratan khusus untuk kursus ini, meskipun akan sangat membantu jika Anda terbiasa mengoperasikan internet.",
    overview: "Lorem ipsum dolor sit amet consectur adipisicing elit, sed do eiusmod tempor inc idid unt ut labore et dolore magna aliqua enim ad minim veniam, quis nostrud exerec tation ullamco laboris nis aliquip commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur enim ipsam. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam.",
    learningGoals: ["Dasar Hukum", "Hukum Acara", "Pemilu", "Sengketa Perkara", "Hukum Pidana", "Hukum Perdata", "Analisa Tahapan dan Penanganan", "Studi banding hasil pemilu antar periode", "Putusan"],
    contentFeatures: [
        { label: "video on-demand", value: "11 jam" },
        { label: "artikel", value: "3" },
        { label: "downloadable resources", value: "12" },
        { label: "Akses di berbagai perangkat", value: "Mac, PC, Ipad atau Mobile" },
        { label: "Akses Materi", value: "Selamanya" },
        { label: "Sertifikat", value: "Tersedia" },
    ],
    curriculum: [
        { title: "Dinamika Penanganan Perkara", subCount: 3, duration: 9, items: [
            { name: "About The Course", time: "01:20", preview: true },
            { name: "Tools Introduction", time: "07:50", preview: true },
            { name: "Basic Document Structure", time: "06:30", preview: true },
            { name: "HTML5 Foundations Certification Final Project", time: "02:40", preview: false },
        ]},
        { title: "Perselisihan Hasil Pemilihan Gubernur", subCount: 3, duration: 9, items: []},
        { title: "Perselisihan Hasil Pemilihan Wakil Gubernur", subCount: 3, duration: 9, items: []},
        { title: "Perselisihan Hasil Pemilihan Walikota dan Wakil Walikota", subCount: 3, duration: 9, items: []},
        { title: "7 Materi Lainnya", subCount: 0, duration: 0, items: []}
    ],
};

// --- KOMPONEN BANTUAN ---

// Komponen Bagian Kurikulum yang bisa dilipat (Accordion)
function CurriculumSection({ title, subCount, duration, items }: typeof COURSE_DATA.curriculum[0]) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isPlaceholder = items.length === 0 && subCount === 0;
    const hasVisibleContent = items.length > 0;

    return (
        <View style={styles.curriculumSection}>
            <TouchableOpacity 
                style={styles.curriculumHeader} 
                onPress={() => hasVisibleContent && setIsExpanded(!isExpanded)}
                activeOpacity={isPlaceholder || !hasVisibleContent ? 1 : 0.8}
            >
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                    {hasVisibleContent && (
                        <Ionicons 
                            name={isExpanded ? "chevron-down" : "chevron-forward"} 
                            size={18} 
                            color={PRIMARY_COLOR} 
                            style={{marginRight: 10}}
                        />
                    )}
                    <View style={{flex: 1, marginLeft: !hasVisibleContent ? 10 : 0}}>
                        <Text style={[styles.curriculumTitle, isPlaceholder && {color: '#666'}]}>{title}</Text>
                        {subCount > 0 && (
                            <Text style={styles.curriculumSubtitle}>{subCount} sub materi | {duration} min</Text>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            
            {isExpanded && hasVisibleContent && (
                <View style={styles.curriculumContent}>
                    {items.map((item, index) => (
                        <View key={index} style={styles.curriculumItem}>
                            <Ionicons 
                                name="play-circle-outline" 
                                size={18} 
                                color={ACCENT_BLUE} 
                                style={{marginRight: 10}}
                            />
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={styles.itemText} numberOfLines={1}>{item.name}</Text>
                                <Text style={styles.itemTime}>{item.time}</Text>
                            </View>
                            {item.preview && <Text style={styles.itemPreview}>Preview</Text>}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}


export default function SKLN3() {
    const router = useRouter();
    const [showFullOverview, setShowFullOverview] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* --- HEADER --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/screens/modul/BimtekSKLN')} style={styles.backButton}>
                       <Ionicons name="arrow-back-outline" size={28} color="#333" />
\              </TouchableOpacity>
                <Text style={styles.headerTitle} numberOfLines={1}>Bimbingan Teknis</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* --- 1. HERO & STATS SECTION --- */}
                <View style={styles.heroSection}>
                    <Text style={styles.courseCategory}>{COURSE_DATA.category}</Text>
                    <Text style={styles.courseTitle}>{COURSE_DATA.title}</Text>
                    
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="book-outline" size={20} color={PRIMARY_COLOR} />
                            <Text style={styles.statText}>{COURSE_DATA.modules} Modul</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="people-outline" size={20} color={PRIMARY_COLOR} />
                            <Text style={styles.statText}>{COURSE_DATA.participants} Orang</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="time-outline" size={20} color={PRIMARY_COLOR} />
                            <Text style={styles.statText}>Updated {COURSE_DATA.lastUpdate}</Text>
                        </View>
                    </View>
                    <Text style={styles.organizerText}>Diselenggarakan Oleh: **{COURSE_DATA.organizer}**</Text>
                </View>
                
                {/* --- 2. TUJUAN PEMBELAJARAN (WHAT YOU WILL LEARN) --- */}
                <Text style={styles.sectionTitle}>Apa yang akan kamu pelajari</Text>
                <View style={styles.chipContainer}>
                    {COURSE_DATA.learningGoals.map((goal, index) => (
                        <View key={index} style={styles.chip}>
                            <Text style={styles.chipText}>{goal}</Text>
                        </View>
                    ))}
                </View>
                
                {/* --- 3. PERSYARATAN KHUSUS --- */}
                <Text style={styles.sectionTitle}>Persyaratan Khusus</Text>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>{COURSE_DATA.prerequisites}</Text>
                    <Text style={styles.infoText}>You can take this course using a Mac, PC or Mobile Phone.</Text>
                </View>

                {/* --- 4. TENTANG MATERI INI (OVERVIEW) --- */}
                <Text style={styles.sectionTitle}>Tentang Materi ini</Text>
                <View style={styles.infoCard}>
                    <Text 
                        style={styles.overviewText} 
                        numberOfLines={showFullOverview ? undefined : 6}
                    >
                        {COURSE_DATA.overview}
                    </Text>
                    <TouchableOpacity onPress={() => setShowFullOverview(!showFullOverview)}>
                        <Text style={styles.showMoreText}>
                            {showFullOverview ? 'Tutup' : 'Show More'} <Ionicons name={showFullOverview ? "chevron-up" : "chevron-down"} size={14} color={PRIMARY_COLOR} />
                        </Text>
                    </TouchableOpacity>
                </View>
                
                {/* --- 5. ISI BIMBINGAN TEKNIS (CURRICULUM) --- */}
                <Text style={styles.sectionTitle}>Isi Bimbingan Teknis</Text>
                <View style={styles.curriculumContainer}>
                    {COURSE_DATA.curriculum.map((section, index) => (
                        <CurriculumSection key={index} {...section} />
                    ))}
                </View>

                {/* Spacer untuk tombol Daftar */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* --- FOOTER FIXED (DAFTAR & FITUR) --- */}
            <View style={styles.fixedFooter}>
                
                {/* FITUR (Materi ini berisikan) */}
                <View style={styles.featuresPanel}>
                    <Text style={styles.featuresTitle}>Materi ini berisikan:</Text>
                    <View style={styles.featureList}>
                        {COURSE_DATA.contentFeatures.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <Ionicons name="checkmark-circle-outline" size={16} color={PRIMARY_COLOR} />
                                <Text style={styles.featureText}>
                                    **{feature.value}** {feature.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* TOMBOL DAFTAR & BAGIKAN */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.shareButton} activeOpacity={0.8}>
                        <Ionicons name="share-social-outline" size={24} color={PRIMARY_COLOR} />
                        <Text style={styles.shareText}>Bagikan Bimbingan Teknis ini</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.registerButton} activeOpacity={0.8}>
                        <Text style={styles.registerButtonText}>Daftar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

// --- STYLESHEET (Disalin dari seri PUU/PHPU/SKLN sebelumnya) ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: BACKGROUND_LIGHT,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: CARD_COLOR,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        marginRight: 10,
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: PRIMARY_COLOR,
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: TEXT_DARK,
        marginBottom: 10,
        marginTop: 25,
    },
    
    // 1. HERO SECTION
    heroSection: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    courseCategory: {
        fontSize: 14,
        fontWeight: '600',
        color: PRIMARY_COLOR,
        marginBottom: 5,
    },
    courseTitle: {
        fontSize: 26,
        fontWeight: '900',
        color: TEXT_DARK,
        marginBottom: 10,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 10,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statText: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    organizerText: {
        fontSize: 14,
        color: '#444',
        marginTop: 5,
        lineHeight: 20,
    },

    // 2. LEARNING GOALS (CHIPS)
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },
    chip: {
        backgroundColor: PRIMARY_COLOR + '10',
        borderRadius: 15,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: PRIMARY_COLOR + '30',
    },
    chipText: {
        fontSize: 13,
        color: PRIMARY_COLOR,
        fontWeight: '600',
    },

    // 3 & 4. INFO CARD (Persyaratan & Tentang Materi)
    infoCard: {
        backgroundColor: CARD_COLOR,
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4, 
        borderLeftColor: ACCENT_BLUE,
        elevation: 1,
    },
    infoText: {
        fontSize: 14,
        color: '#444',
        marginBottom: 5,
    },
    overviewText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 22,
        marginBottom: 10,
        textAlign: 'justify',
    },
    showMoreText: {
        color: PRIMARY_COLOR,
        fontWeight: '700',
        marginTop: 5,
        alignSelf: 'flex-end',
    },

    // 5. KURIKULUM (ACCORDION)
    curriculumContainer: {
        backgroundColor: CARD_COLOR,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    curriculumSection: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    curriculumHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    curriculumTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: TEXT_DARK,
    },
    curriculumSubtitle: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    curriculumContent: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
    },
    curriculumItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    itemText: {
        fontSize: 14,
        color: '#444',
        flexShrink: 1,
    },
    itemTime: {
        fontSize: 13,
        color: '#666',
        marginLeft: 10,
        fontWeight: '600',
    },
    itemPreview: {
        fontSize: 13,
        color: PRIMARY_COLOR,
        fontWeight: '700',
        marginLeft: 10,
    },

    // --- FOOTER FIXED ---
    fixedFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: CARD_COLOR,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    // Panel Fitur
    featuresPanel: {
        marginBottom: 10,
    },
    featuresTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: TEXT_DARK,
        marginBottom: 5,
    },
    featureList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        gap: 5,
    },
    featureText: {
        fontSize: 13,
        color: '#444',
    },
    
    // Tombol Aksi
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        gap: 5,
        flex: 1,
    },
    shareText: {
        color: PRIMARY_COLOR,
        fontSize: 14,
        fontWeight: '600',
    },
    registerButton: {
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 25,
        minWidth: 120,
        marginLeft: 15,
    },
    registerButtonText: {
        color: CARD_COLOR,
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
    },
});