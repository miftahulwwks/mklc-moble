import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TEST_DURATION_MINUTES = 1;
const INITIAL_TIME_SECONDS = TEST_DURATION_MINUTES * 60;
const TOTAL_QUESTIONS = 20;
const PRIMARY_RED = "#8B0000";
const SECONDARY_RED = "#D32F2F";

const DUMMY_ANSWERS: Record<number, string> = {};
for (let i = 1; i <= 5; i++) DUMMY_ANSWERS[i] = "A";
for (let i = 6; i <= 10; i++) DUMMY_ANSWERS[i] = "B";
for (let i = 11; i <= 15; i++) DUMMY_ANSWERS[i] = "C";
for (let i = 16; i <= 20; i++) DUMMY_ANSWERS[i] = "D";
DUMMY_ANSWERS[20] = "E";

interface ScoreResult {
  totalCorrect: number;
  totalIncorrect: number;
  score: number;
}

const calculateScore = (
  userAnswers: Record<number, string | null>,
): ScoreResult => {
  let correct = 0;

  for (let i = 1; i <= TOTAL_QUESTIONS; i++) {
    if (userAnswers[i] && userAnswers[i] === DUMMY_ANSWERS[i]) {
      correct++;
    }
  }

  const totalIncorrect = TOTAL_QUESTIONS - correct;
  const score = (correct / TOTAL_QUESTIONS) * 100;

  return {
    totalCorrect: correct,
    totalIncorrect: totalIncorrect,
    score: parseFloat(score.toFixed(2)),
  };
};

const DUMMY_NARRATION = `
Bacaan ini digunakan untuk menjawab soal nomor 1 sampai 5.
... (Teks Narasi Dummy) ...
Keterlambatan pengambilan keputusan dikhawatirkan akan memperburuk kondisi kesehatan masyarakat dan meningkatkan migrasi penduduk ke kota-kota besar.
`;

const initialQuestionStatuses: (
  | "answered"
  | "unanswered"
  | "current"
  | "marked"
)[] = Array(TOTAL_QUESTIONS).fill("unanswered");
initialQuestionStatuses[0] = "current";

const DUMMY_QUESTIONS = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => ({
  number: i + 1,
  text:
    i < 5
      ? `Soal Pemahaman Narasi ke-${i + 1} tentang Krisis Air.`
      : `Soal Mandiri ke-${i + 1} (Keterangan tempat dan tanggal...).`,
}));

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;
};

interface QuestionButtonProps {
  number: number;
  status: "answered" | "unanswered" | "current" | "marked";
  onPress: (number: number) => void;
}
const QuestionButton: React.FC<QuestionButtonProps> = React.memo(
  ({ number, status, onPress }) => {
    let style;
    let textStyle: any = { color: "#333" };

    switch (status) {
      case "current":
        style = styles.questionBtnCurrent;
        textStyle = { color: PRIMARY_RED, fontWeight: "700" };
        break;
      case "answered":
        style = styles.questionBtnAnswered;
        textStyle = { color: "#FFF", fontWeight: "600" };
        break;
      case "unanswered":
        style = styles.questionBtnUnanswered;
        textStyle = { color: "#333", fontWeight: "600" };
        break;
      case "marked":
        style = styles.questionBtnMarked;
        textStyle = { color: "#FFF", fontWeight: "600" };
        break;
      default:
        style = styles.questionBtnUnanswered;
        textStyle = { color: "#333", fontWeight: "600" };
        break;
    }

    return (
      <TouchableOpacity
        style={[styles.questionBtnBase, style]}
        onPress={() => onPress(number)}
      >
        <Text style={[styles.questionBtnText, textStyle]}>{number}</Text>
      </TouchableOpacity>
    );
  },
);

interface OptionProps {
  option: { key: string; text: string };
  selected: boolean;
  onSelect: () => void;
}
const OptionItem: React.FC<OptionProps> = ({ option, selected, onSelect }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onSelect}>
    <View style={styles.radioOuter}>
      {selected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.optionText}>{option.text}</Text>
  </TouchableOpacity>
);

interface NarrationOverlayProps {
  visible: boolean;
  onClose: () => void;
  narrationText: string;
}
const NarrationOverlay: React.FC<NarrationOverlayProps> = ({
  visible,
  onClose,
  narrationText,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.narrationContainer}>
          <View style={styles.narrationHeader}>
            <Text style={styles.narrationTitle}>Bacaan Terkait Soal</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.narrationCloseButton}
            >
              <Ionicons
                name="close-circle-outline"
                size={30}
                color={PRIMARY_RED}
              />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.narrationScroll}>
            <Text style={styles.narrationText}>{narrationText}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

interface ReviewPanelProps {
  questions: { number: number; text: string }[];
  questionStatuses: ("answered" | "unanswered" | "current" | "marked")[];
  userAnswers: Record<number, string | null>;
  onStartTest: () => void;
  onGoToQuestion: (qNum: number) => void;
  onSubmitFinal: () => void;
}
const ReviewPanel: React.FC<ReviewPanelProps> = ({
  questions,
  questionStatuses,
  userAnswers,
  onGoToQuestion,
  onStartTest,
  onSubmitFinal,
}) => {
  const unansweredCount = questionStatuses.filter(
    (s) => s === "unanswered",
  ).length;
  const answeredCount = TOTAL_QUESTIONS - unansweredCount;

  return (
    <View style={styles.reviewPanelContainer}>
      <Text style={styles.reviewTitle}>Ringkasan Jawaban Tes</Text>

      <View style={styles.reviewStatusBox}>
        <View style={styles.reviewStatusItem}>
          <Text style={styles.reviewStatusNumber}>{answeredCount}</Text>
          <Text style={styles.reviewStatusText}>Terjawab</Text>
        </View>
        <View style={styles.reviewStatusItem}>
          <Text style={[styles.reviewStatusNumber, { color: SECONDARY_RED }]}>
            {unansweredCount}
          </Text>
          <Text style={styles.reviewStatusText}>Belum Jawab</Text>
        </View>
        <View style={styles.reviewStatusItem}>
          <Text style={styles.reviewStatusNumber}>{TOTAL_QUESTIONS}</Text>
          <Text style={styles.reviewStatusText}>Total Soal</Text>
        </View>
      </View>

      <ScrollView style={styles.reviewListScroll}>
        {questions.map((q, index) => {
          const status = questionStatuses[index];
          const answer = userAnswers[q.number];
          const answerDisplay = answer ? `Jawab: ${answer}` : "BELUM DIJAWAB";

          return (
            <View
              key={q.number}
              style={[
                styles.reviewQuestionCard,
                {
                  borderLeftColor:
                    status === "answered" ? PRIMARY_RED : SECONDARY_RED,
                },
              ]}
            >
              <Text style={styles.reviewQuestionNumber}>
                Soal No. {q.number}
              </Text>
              <Text style={styles.reviewQuestionText} numberOfLines={2}>
                {q.text}
              </Text>
              <View style={styles.reviewAnswerRow}>
                <Text
                  style={[
                    styles.reviewAnswerStatus,
                    {
                      color:
                        status === "answered" ? PRIMARY_RED : SECONDARY_RED,
                    },
                  ]}
                >
                  {answerDisplay}
                </Text>
                <TouchableOpacity
                  onPress={() => onGoToQuestion(q.number)}
                  style={styles.reviewGoToButton}
                >
                  <Text style={styles.reviewGoToText}>Lihat Soal →</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <TouchableOpacity
        style={[styles.nextButton, styles.reviewSubmitButton]}
        onPress={() => {
          if (unansweredCount > 0) {
            Alert.alert(
              "Perhatian",
              `Anda masih memiliki ${unansweredCount} soal yang belum dijawab. Tetap ingin mengirimkan jawaban?`,
              [
                { text: "Batal", style: "cancel" },
                { text: "Ya, Kirim Sekarang", onPress: onSubmitFinal },
              ],
            );
          } else {
            onSubmitFinal();
          }
        }}
      >
        <Text style={styles.nextButtonText}>Kirim Jawaban Akhir</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.reviewBackToTestButton}
        onPress={onStartTest}
      >
        <Text style={styles.reviewBackToTestText}>Kembali ke Tes</Text>
      </TouchableOpacity>
    </View>
  );
};

interface ResultPanelProps {
  scoreResult: ScoreResult;
  onClose: () => void;
}
const ResultPanel: React.FC<ResultPanelProps> = ({ scoreResult, onClose }) => {
  const isPassed = scoreResult.score >= 70;
  const scoreColor = isPassed ? "#10B981" : SECONDARY_RED;
  const bgColor = isPassed ? "#ECFDF5" : "#FEF2F2";
  const borderColor = isPassed ? "#10B981" : SECONDARY_RED;

  return (
    <ScrollView contentContainerStyle={styles.resultPanelContainer}>
      <View style={styles.resultHeader}>
        <View
          style={[styles.resultIconBox, { backgroundColor: scoreColor + "15" }]}
        >
          <Ionicons
            name={isPassed ? "checkmark-circle" : "alert-circle"}
            size={60}
            color={scoreColor}
          />
        </View>
        <Text style={styles.resultTitle}>Hasil Tes Anda</Text>
        <Text style={[styles.resultSubtitle, { color: scoreColor }]}>
          {isPassed
            ? "Selamat, Anda Lulus!"
            : "Anda Perlu Belajar Lebih Lanjut"}
        </Text>
      </View>

      <View
        style={[
          styles.scoreCard,
          { backgroundColor: bgColor, borderColor: borderColor },
        ]}
      >
        <Text style={styles.scoreLabel}>Skor Akhir Anda</Text>
        <View style={styles.scoreDisplayRow}>
          <Text style={[styles.finalScoreText, { color: scoreColor }]}>
            {scoreResult.score}%
          </Text>
          <View style={styles.scoreIndicator}>
            <Text style={[styles.scorePercentText, { color: scoreColor }]}>
              {isPassed ? "LULUS" : "TIDAK LULUS"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Rincian Jawaban</Text>

        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailLeftContent}>
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
              <Text style={styles.detailLabel}>Jawaban Benar</Text>
            </View>
            <Text style={[styles.detailValue, { color: "#10B981" }]}>
              {scoreResult.totalCorrect}/{TOTAL_QUESTIONS}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLeftContent}>
              <Ionicons name="close-circle" size={24} color={SECONDARY_RED} />
              <Text style={styles.detailLabel}>Jawaban Salah</Text>
            </View>
            <Text style={[styles.detailValue, { color: SECONDARY_RED }]}>
              {scoreResult.totalIncorrect}/{TOTAL_QUESTIONS}
            </Text>
          </View>

          <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
            <View style={styles.detailLeftContent}>
              <Ionicons name="help-circle" size={24} color="#6B7280" />
              <Text style={styles.detailLabel}>Total Soal</Text>
            </View>
            <Text style={styles.detailValue}>{TOTAL_QUESTIONS} Soal</Text>
          </View>
        </View>
      </View>

      <View style={styles.progressWrapper}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${scoreResult.score}%`,
                backgroundColor: scoreColor,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>Tingkat Keberhasilan</Text>
      </View>

      <View
        style={[
          styles.motivationBox,
          { backgroundColor: bgColor, borderColor: borderColor },
        ]}
      >
        <Text style={[styles.motivationText, { color: scoreColor }]}>
          {isPassed
            ? "Excellent! Anda telah menguasai materi dengan baik. Lanjutkan pembelajaran untuk mengasah kemampuan lebih dalam."
            : "Jangan menyerah! Tingkatkan pemahaman Anda dengan mempelajari kembali materi dan coba tes ulang."}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, { marginTop: 20 }]}
        onPress={onClose}
      >
        <Text style={styles.nextButtonText}>Kembali ke Menu</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default function posttest_pphkwn() {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME_SECONDS);
  const [isTestActive, setIsTestActive] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | null>>(
    {},
  );
  const [questionStatuses, setQuestionStatuses] = useState(
    initialQuestionStatuses,
  );

  const [showNarration, setShowNarration] = useState(false);
  const [isNarrationSeen, setIsNarrationSeen] = useState(false);

  const [isReviewMode, setIsReviewMode] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState<ScoreResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (!isNarrationSeen) {
      setShowNarration(true);
    }
  }, [isNarrationSeen]);

  const handleDismissNarration = () => {
    setShowNarration(false);
    setIsNarrationSeen(true);
  };

  useEffect(() => {
    if (!isTestActive || timeLeft <= 0) {
      if (timeLeft === 0 && isTestActive) {
        Alert.alert(
          "Waktu Habis",
          "Waktu pengerjaan tes telah berakhir. Anda akan diarahkan ke halaman review untuk pengiriman otomatis.",
        );
        setIsTestActive(false);
        setIsReviewMode(true);
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [isTestActive, timeLeft]);
  const updateQuestionStatus = useCallback(
    (qNum: number, answer: string | null) => {
      setQuestionStatuses((prevStatuses) => {
        const newStatuses = [...prevStatuses];
        newStatuses[qNum - 1] = answer ? "answered" : "unanswered";
        return newStatuses;
      });
    },
    [],
  );

  const handleQuestionNavigation = useCallback(
    (qNum: number) => {
      if (qNum === currentQuestion) return;

      setQuestionStatuses((prevStatuses) => {
        const newStatuses = [...prevStatuses];
        const prevAnswer = userAnswers[currentQuestion];
        newStatuses[currentQuestion - 1] = prevAnswer
          ? "answered"
          : "unanswered";
        newStatuses[qNum - 1] = "current";

        return newStatuses;
      });

      setCurrentQuestion(qNum);
    },
    [currentQuestion, userAnswers],
  );

  const handleOptionSelect = useCallback(
    (optionKey: string) => {
      setUserAnswers((prevAnswers) => ({
        ...prevAnswers,
        [currentQuestion]: optionKey,
      }));

      updateQuestionStatus(currentQuestion, optionKey);
    },
    [currentQuestion, updateQuestionStatus],
  );

  const handleFinalSubmit = () => {
    const result = calculateScore(userAnswers);
    setFinalScore(result);

    setIsReviewMode(false);
    setIsTestActive(false);
    setShowResult(true);
  };

  const handleCloseResult = () => {
    router.push("/screens/modul/pphkwn");
  };
  const handleNextQuestion = () => {
    if (currentQuestion < TOTAL_QUESTIONS) {
      handleQuestionNavigation(currentQuestion + 1);
    } else {
      Alert.alert(
        "Akhiri Tes",
        "Anda telah mencapai akhir soal. Apakah Anda ingin meninjau jawaban Anda sebelum dikirim?",
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Ya, Tinjau Jawaban",
            onPress: () => {
              updateQuestionStatus(
                currentQuestion,
                userAnswers[currentQuestion],
              );
              setIsReviewMode(true);
              setIsTestActive(false);
            },
          },
          {
            text: "Kirim Sekarang",
            onPress: handleFinalSubmit,
            style: "destructive",
          },
        ],
      );
    }
  };

  const handleGoToQuestionFromReview = useCallback(
    (qNum: number) => {
      setIsReviewMode(false);
      setIsTestActive(true);
      setQuestionStatuses((prevStatuses) => {
        const newStatuses = [...prevStatuses];
        const currentQIndex = newStatuses.findIndex(
          (status) => status === "current",
        );
        if (currentQIndex !== -1) {
          const prevAnswer = userAnswers[currentQIndex + 1];
          newStatuses[currentQIndex] = prevAnswer ? "answered" : "unanswered";
        }
        newStatuses[qNum - 1] = "current";
        return newStatuses;
      });
      setCurrentQuestion(qNum);
    },
    [userAnswers],
  );

  const currentQuestionData = {
    number: currentQuestion,
    instruction:
      currentQuestion <= 5
        ? 'Petunjuk: Jawablah berdasarkan Narasi di atas. Klik "Lihat Narasi" jika perlu.'
        : "Petunjuk: Pilihlah jawaban yang paling tepat.",
    text: `(Soal ke-${currentQuestion} dari ${TOTAL_QUESTIONS}) Pilihlah jawaban yang paling tepat untuk mengisi titik-titik pada bagian keterangan tempat dan tanggal... (Kunci: ${DUMMY_ANSWERS[currentQuestion]})`,
    options: [
      { key: "A", text: "Opsi A" },
      { key: "B", text: "Opsi B" },
      { key: "C", text: "Opsi C" },
      { key: "D", text: "Opsi D" },
      { key: "E", text: "Opsi E" },
    ],
  };
  if (showResult && finalScore) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Hasil Akhir Tes</Text>
        </View>
        <ResultPanel scoreResult={finalScore} onClose={handleCloseResult} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>@Mahkamah Konstitusi 2025</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isReviewMode) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setIsReviewMode(false)}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back-outline" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Review & Kirim Jawaban</Text>
        </View>
        <ReviewPanel
          questions={DUMMY_QUESTIONS}
          questionStatuses={questionStatuses}
          userAnswers={userAnswers}
          onStartTest={() => {
            setIsReviewMode(false);
            setIsTestActive(true);
          }}
          onGoToQuestion={handleGoToQuestionFromReview}
          onSubmitFinal={handleFinalSubmit}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>@Mahkamah Konstitusi 2025</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <NarrationOverlay
        visible={showNarration}
        onClose={handleDismissNarration}
        narrationText={DUMMY_NARRATION}
      />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push("/screens/modul/pphkwn")}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back-outline" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test Lorem Ipsum</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[PRIMARY_RED]}
            tintColor={PRIMARY_RED}
          />
        }
      >
        <View style={styles.instructionPanel}>
          <View style={styles.card}>
            <Text style={styles.panelTitle}>Sisa Waktu</Text>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
          </View>
        </View>

        <View style={styles.questionSection}>
          <View style={styles.instructionPerQuestion}>
            <Text style={styles.instructionText}>
              {currentQuestionData.instruction}
            </Text>
          </View>

          <Text style={styles.questionNumberText}>
            {currentQuestionData.number}. {currentQuestionData.text}
          </Text>

          {currentQuestionData.options.map((option) => (
            <OptionItem
              key={option.key}
              option={option}
              selected={userAnswers[currentQuestion] === option.key}
              onSelect={() => handleOptionSelect(option.key)}
            />
          ))}

          <View style={styles.navigationPanel}>
            {currentQuestion <= 20 && (
              <TouchableOpacity
                style={styles.openNarrationButton}
                onPress={() => setShowNarration(true)}
              >
                <Ionicons name="document-text-outline" size={18} color="#FFF" />
                <Text style={styles.openNarrationText}>Lihat Narasi</Text>
              </TouchableOpacity>
            )}

            <Text style={[styles.panelTitle, { marginTop: 15 }]}>
              Navigasi Soal
            </Text>
            <View style={styles.questionGrid}>
              {questionStatuses.map((status, index) => (
                <QuestionButton
                  key={index}
                  number={index + 1}
                  status={status as any}
                  onPress={handleQuestionNavigation}
                />
              ))}
            </View>
            <View style={styles.statusLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.questionBtnAnswered]} />
                <Text style={styles.legendText}>Terjawab</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendBox, styles.questionBtnUnanswered]}
                />
                <Text style={styles.legendText}>Belum Jawab</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.questionBtnCurrent]} />
                <Text style={styles.legendText}>Saat Ini</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextQuestion}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion < TOTAL_QUESTIONS
                ? "Soal Selanjutnya"
                : "Akhiri Tes"}
            </Text>
            <Ionicons name="arrow-forward-outline" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>@Mahkamah Konstitusi 2025</Text>
      </View>
    </SafeAreaView>
  );
}

const colors = {
  primary: PRIMARY_RED,
  secondary: SECONDARY_RED,
  answered: PRIMARY_RED,
  unanswered: "#E0E0E0",
  current: "#FFF",
  text: "#333",
  background: "#F5F5F5",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },

  instructionPanel: {
    marginBottom: 20,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  card: {
    marginBottom: 5,
    paddingBottom: 5,
  },
  panelTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
    marginBottom: 5,
  },
  timerText: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.secondary,
  },

  instructionPerQuestion: {
    backgroundColor: "#FFFBEA",
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
    marginBottom: 15,
  },
  instructionText: {
    fontSize: 13,
    color: "#555",
    fontWeight: "500",
  },
  questionSection: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questionNumberText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  navigationPanel: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  questionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginBottom: 10,
  },
  questionBtnBase: {
    width: 35,
    height: 35,
    borderRadius: 6,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  questionBtnAnswered: {
    backgroundColor: colors.primary,
  },
  questionBtnUnanswered: {
    backgroundColor: colors.unanswered,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  questionBtnCurrent: {
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  questionBtnMarked: {
    backgroundColor: colors.secondary,
  },
  questionBtnText: {
    fontWeight: "600",
    fontSize: 14,
  },
  statusLegend: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
    flexWrap: "wrap",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 5,
  },
  legendBox: {
    width: 15,
    height: 15,
    borderRadius: 3,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#777",
  },
  openNarrationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: SECONDARY_RED,
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  openNarrationText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 8,
  },
  reviewButtonMidTest: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    marginTop: 10,
  },
  reviewButtonMidTestText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  nextButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  nextButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
    marginRight: 8,
  },

  footer: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
  },
  footerText: {
    color: "#FFF",
    fontSize: 12,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  narrationContainer: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    maxHeight: "80%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  narrationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  narrationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
  },
  narrationCloseButton: {
    padding: 5,
  },
  narrationScroll: {
    paddingVertical: 15,
  },
  narrationText: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    textAlign: "justify",
  },

  reviewPanelContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  reviewTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 15,
    textAlign: "center",
  },
  reviewStatusBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  reviewStatusItem: {
    alignItems: "center",
  },
  reviewStatusNumber: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.primary,
  },
  reviewStatusText: {
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
  },
  reviewListScroll: {
    flex: 1,
  },
  reviewQuestionCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#CCC",
    elevation: 1,
  },
  reviewQuestionNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 5,
  },
  reviewQuestionText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
  },
  reviewAnswerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  reviewAnswerStatus: {
    fontSize: 13,
    fontWeight: "700",
  },
  reviewGoToButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  reviewGoToText: {
    color: SECONDARY_RED,
    fontWeight: "600",
    fontSize: 13,
  },
  reviewSubmitButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
  },
  reviewBackToTestButton: {
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
  },
  reviewBackToTestText: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },

  resultPanelContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#F9F9F9",
  },
  resultHeader: {
    alignItems: "center",
    marginBottom: 35,
  },
  resultIconBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  resultSubtitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
  },
  scoreCard: {
    padding: 25,
    borderRadius: 18,
    marginBottom: 25,
    borderWidth: 2,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  scoreDisplayRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
  finalScoreText: {
    fontSize: 56,
    fontWeight: "900",
    lineHeight: 60,
  },
  scoreIndicator: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  scorePercentText: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 1,
  },
  detailsContainer: {
    marginBottom: 25,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.primary,
    marginBottom: 12,
  },
  detailCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  detailLeftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  progressWrapper: {
    marginBottom: 25,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 10,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
    textAlign: "center",
  },
  motivationBox: {
    padding: 18,
    borderRadius: 14,
    borderWidth: 2,
    backgroundColor: "#FFF",
    marginBottom: 25,
  },
  motivationText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "500",
    textAlign: "center",
  },
});
