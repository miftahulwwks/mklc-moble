import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// --- KONSTANTA WARNA BRANDING MK ---
const PRIMARY_COLOR = "#8B0000"; 
const ACCENT_GOLD = "#D4AF37";   // Menambahkan aksen emas khas MK
const ACCENT_BLUE = "#007AFF"; 
const BACKGROUND_LIGHT = "#F4F4F4"; 
const CARD_COLOR = "#FFFFFF";       
const TEXT_DARK = "#1A1A1A";
const TEXT_GRAY = "#666666";

const COURSE_DATA = {
    title: "Pengujian Undang-Undang (PUU)",
    category: "Bimtek PUU",
    modules: 11,
    hours: 30,
    participants: 229,
    lastUpdate: "12/2024",
    organizer: "Pusat Pendidikan Pancasila dan Konstitusi MKRI",
    prerequisites: "Tidak ada persyaratan khusus untuk kursus ini, meskipun akan sangat membantu jika Anda terbiasa mengoperasikan internet.",
    overview: "Materi ini membahas secara komprehensif mengenai mekanisme hukum acara pengujian undang-undang di Mahkamah Konstitusi, mulai dari tahap pengajuan permohonan hingga pembuktian dan putusan.",
    learningGoals: ["Dasar Hukum", "Hukum Acara", "Pemilu", "Sengketa Perkara", "Analisis Putusan"],
    contentFeatures: [
        { label: "video on-demand", value: "11 jam", icon: "play-circle" },
        { label: "artikel bacaan", value: "3", icon: "document-text" },
        { label: "file unduhan", value: "12", icon: "download" },
        { label: "Sertifikat", value: "Resmi", icon: "ribbon" },
    ],
    curriculum: [
        { title: "Dinamika Penanganan Perkara", subCount: 3, duration: 9, items: [
            { name: "Pengantar Hukum Acara MK", time: "05:20", preview: true },
            { name: "Teknis Penyusunan Permohonan", time: "12:50", preview: true },
            { name: "Simulasi Persidangan Panel", time: "15:30", preview: false },
        ]},
        { title: "Sengketa Hasil Pemilihan Kepala Daerah", subCount: 2, duration: 25, items: [
            { name: "Objek Perselisihan PHP", time: "10:20", preview: true },
            { name: "Kedudukan Hukum (Legal Standing)", time: "15:50", preview: false },
        ]},
    ],
};

function CurriculumSection({ title, subCount, duration, items }: any) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View style={styles.curriculumSection}>
            <TouchableOpacity 
                style={[styles.curriculumHeader, isExpanded && styles.activeHeader]} 
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.7}
            >
                <View style={{flex: 1}}>
                    <Text style={[styles.curriculumTitle, isExpanded && {color: PRIMARY_COLOR}]}>{title}</Text>
                    <Text style={styles.curriculumSubtitle}>{subCount} Materi • {duration} Menit</Text>
                </View>
                <Ionicons 
                    name={isExpanded ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={isExpanded ? PRIMARY_COLOR : TEXT_GRAY} 
                />
            </TouchableOpacity>
            
            {isExpanded && (
                <View style={styles.curriculumContent}>
                    {items.map((item: any, index: number) => (
                        <TouchableOpacity key={index} style={styles.curriculumItem}>
                            <Ionicons name="play-circle" size={22} color={PRIMARY_COLOR} />
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemText} numberOfLines={2}>{item.name}</Text>
                                <View style={styles.itemMeta}>
                                    <Text style={styles.itemTime}>{item.time}</Text>
                                    {item.preview && <View style={styles.previewBadge}><Text style={styles.previewText}>Gratis</Text></View>}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

export default function PUU1() {
    const router = useRouter();
    const [showFullOverview, setShowFullOverview] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/screens/modul/BimtekPUU')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={TEXT_DARK} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detail Bimbingan Teknis</Text>
                <TouchableOpacity style={styles.backButton}>
                    <Ionicons name="heart-outline" size={24} color={TEXT_DARK} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
                
                {/* --- THUMBNAIL VIDEO PLACEHOLDER --- */}
                <ImageBackground 
                    source={{ uri: 'https://via.placeholder.com/800x450/8B0000/FFFFFF?text=Video+Profil+Materi' }} 
                    style={styles.thumbnail}
                    imageStyle={{ borderRadius: 12 }}
                >
                    <View style={styles.playOverlay}>
                        <Ionicons name="play" size={40} color="white" />
                    </View>
                </ImageBackground>

                <View style={styles.heroSection}>
                    <View style={styles.badgeCategory}>
                        <Text style={styles.badgeText}>{COURSE_DATA.category}</Text>
                    </View>
                    <Text style={styles.courseTitle}>{COURSE_DATA.title}</Text>
                    
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Ionicons name="people" size={16} color={ACCENT_GOLD} />
                            <Text style={styles.statText}>{COURSE_DATA.participants} Peserta</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Ionicons name="star" size={16} color={ACCENT_GOLD} />
                            <Text style={styles.statText}>4.9 (Review)</Text>
                        </View>
                    </View>
                </View>

                {/* --- TUJUAN --- */}
                <Text style={styles.sectionTitle}>Topik Utama</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
                    {COURSE_DATA.learningGoals.map((goal, index) => (
                        <View key={index} style={styles.chip}>
                            <Text style={styles.chipText}>{goal}</Text>
                        </View>
                    ))}
                </ScrollView>

                {/* --- INFO CARD --- */}
                <View style={styles.mainCard}>
                    <Text style={styles.cardSectionTitle}>Deskripsi</Text>
                    <Text 
                        style={styles.overviewText} 
                        numberOfLines={showFullOverview ? undefined : 3}
                    >
                        {COURSE_DATA.overview}
                    </Text>
                    <TouchableOpacity onPress={() => setShowFullOverview(!showFullOverview)}>
                        <Text style={styles.showMoreText}>{showFullOverview ? 'Lihat Sedikit' : 'Baca Selengkapnya'}</Text>
                    </TouchableOpacity>
                </View>

                {/* --- KURIKULUM --- */}
                <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Kurikulum Materi</Text>
                    <Text style={styles.totalModules}>{COURSE_DATA.modules} Modul</Text>
                </View>
                
                <View style={styles.curriculumContainer}>
                    {COURSE_DATA.curriculum.map((section, index) => (
                        <CurriculumSection key={index} {...section} />
                    ))}
                </View>

                <View style={{ height: 180 }} />
            </ScrollView>

            {/* --- FOOTER FIXED --- */}
            <View style={styles.fixedFooter}>
                <View style={styles.featuresRow}>
                   {COURSE_DATA.contentFeatures.slice(0, 3).map((f, i) => (
                       <View key={i} style={styles.footerInfoItem}>
                           <Ionicons name={f.icon as any} size={14} color={PRIMARY_COLOR} />
                           <Text style={styles.footerInfoText}>{f.value} {f.label}</Text>
                       </View>
                   ))}
                </View>
                
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.outlineButton}>
                        <Ionicons name="share-social-outline" size={20} color={PRIMARY_COLOR} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>Mulai Belajar Sekarang</Text>
                        <Ionicons name="arrow-forward" size={18} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: BACKGROUND_LIGHT },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: CARD_COLOR,
    },
    headerTitle: { fontSize: 16, fontWeight: '700', color: TEXT_DARK },
    backButton: { padding: 8, borderRadius: 10, backgroundColor: '#F0F0F0' },
    content: { padding: 16 },
    
    thumbnail: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#000',
    },
    playOverlay: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(139, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
    },

    heroSection: { marginBottom: 20 },
    badgeCategory: {
        backgroundColor: PRIMARY_COLOR,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    badgeText: { color: 'white', fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
    courseTitle: { fontSize: 24, fontWeight: '800', color: TEXT_DARK, lineHeight: 30 },
    statsRow: { flexDirection: 'row', marginTop: 10, gap: 15 },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    statText: { fontSize: 13, color: TEXT_GRAY, fontWeight: '500' },

    sectionTitle: { fontSize: 18, fontWeight: '800', color: TEXT_DARK, marginBottom: 12 },
    sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 12 },
    totalModules: { color: PRIMARY_COLOR, fontWeight: '700' },

    chipScroll: { marginBottom: 10 },
    chip: { backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#DDD' },
    chipText: { fontSize: 13, color: TEXT_DARK, fontWeight: '600' },

    mainCard: { backgroundColor: CARD_COLOR, padding: 16, borderRadius: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    cardSectionTitle: { fontSize: 14, fontWeight: '700', color: TEXT_DARK, marginBottom: 8 },
    overviewText: { fontSize: 14, color: TEXT_GRAY, lineHeight: 22 },
    showMoreText: { color: PRIMARY_COLOR, fontWeight: '700', marginTop: 8 },

    curriculumContainer: { borderRadius: 12, overflow: 'hidden', backgroundColor: 'white', borderWidth: 1, borderColor: '#EEE' },
    curriculumSection: { borderBottomWidth: 1, borderBottomColor: '#EEE' },
    curriculumHeader: { padding: 16, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' },
    activeHeader: { backgroundColor: '#FFF5F5' },
    curriculumTitle: { fontSize: 15, fontWeight: '700', color: TEXT_DARK },
    curriculumSubtitle: { fontSize: 12, color: TEXT_GRAY, marginTop: 4 },
    
    curriculumContent: { backgroundColor: '#FAFAFA', paddingBottom: 10 },
    curriculumItem: { flexDirection: 'row', padding: 16, gap: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
    itemInfo: { flex: 1 },
    itemText: { fontSize: 14, fontWeight: '600', color: TEXT_DARK },
    itemMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 10 },
    itemTime: { fontSize: 12, color: TEXT_GRAY },
    previewBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    previewText: { fontSize: 10, color: '#2E7D32', fontWeight: 'bold' },

    fixedFooter: {
        position: 'absolute', bottom: 0, width: '100%',
        backgroundColor: 'white', padding: 20,
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        elevation: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10
    },
    featuresRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    footerInfoItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    footerInfoText: { fontSize: 11, color: TEXT_GRAY, fontWeight: '600' },
    actionRow: { flexDirection: 'row', gap: 12 },
    outlineButton: { width: 50, height: 50, borderRadius: 12, borderWidth: 1, borderColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center' },
    primaryButton: { flex: 1, height: 50, backgroundColor: PRIMARY_COLOR, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
    primaryButtonText: { color: 'white', fontSize: 16, fontWeight: '700' },
});