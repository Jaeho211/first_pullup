import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { useAppData } from '@/context/AppDataContext';
import { DEFAULT_PROFILE, LEVELS } from '@/domain/exercises';
import { exportWorkoutData } from '@/services/exportWorkoutData';

export default function SettingsScreen() {
  const { profile, sessions, saveProfile, resetData } = useAppData();
  const [name, setName] = useState(profile.name);
  const [weeklyTarget, setWeeklyTarget] = useState(String(profile.weeklyTarget));
  const [level, setLevel] = useState(profile.currentLevel);
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);

  const save = async () => { const target = Number(weeklyTarget); if (!name.trim() || !Number.isInteger(target) || target < 1 || target > 7) { Alert.alert('입력값을 확인하세요', '이름과 주간 목표(1~7회)를 올바르게 입력해 주세요.'); return; } setSaving(true); try { await saveProfile({ ...profile, name: name.trim(), weeklyTarget: target, currentLevel: level }); router.back(); } catch { Alert.alert('저장하지 못했습니다', '잠시 후 다시 시도해 주세요.'); } finally { setSaving(false); } };
  const shareRecords = async () => { setExporting(true); try { await exportWorkoutData(profile, sessions); } catch { Alert.alert('내보내지 못했습니다', '잠시 후 다시 시도해 주세요.'); } finally { setExporting(false); } };
  const performReset = async () => { try { await resetData(); setName(DEFAULT_PROFILE.name); setWeeklyTarget(String(DEFAULT_PROFILE.weeklyTarget)); setLevel(DEFAULT_PROFILE.currentLevel); Alert.alert('초기화 완료', '프로필과 운동 기록을 모두 삭제했습니다.'); } catch { Alert.alert('초기화하지 못했습니다', '잠시 후 다시 시도해 주세요.'); } };
  const confirmResetAgain = () => Alert.alert('정말 모두 삭제할까요?', '삭제한 프로필과 운동 기록은 복구할 수 없습니다.', [{ text: '취소', style: 'cancel' }, { text: '영구 삭제', style: 'destructive', onPress: () => void performReset() }]);
  const confirmReset = () => Alert.alert('운동 데이터 전체 초기화', '앱 테스트 등을 위해 모든 데이터를 지웁니다. 계속하려면 다음 화면에서 한 번 더 확인해 주세요.', [{ text: '취소', style: 'cancel' }, { text: '계속', onPress: confirmResetAgain }]);

  return <Screen>
    <Text style={styles.label}>사용자 이름</Text><TextInput value={name} onChangeText={setName} style={styles.input} maxLength={20} autoCapitalize="none" />
    <Text style={styles.label}>주간 목표 횟수</Text><TextInput value={weeklyTarget} onChangeText={setWeeklyTarget} style={styles.input} keyboardType="number-pad" maxLength={1} />
    <Text style={styles.label}>현재 운동 단계</Text><View style={styles.levels}>{LEVELS.map((item) => <Pressable key={item.level} onPress={() => setLevel(item.level)} style={[styles.levelRow, level === item.level && styles.selected]}><View style={[styles.radio, level === item.level && styles.radioSelected]}>{level === item.level && <View style={styles.dot} />}</View><View style={styles.levelCopy}><Text style={styles.levelName}>Level {item.level} · {item.name}</Text><Text style={styles.summary}>{item.summary}</Text></View></Pressable>)}</View>
    <PrimaryButton title="설정 저장" loading={saving} onPress={save} />
    <View style={styles.dataSection}><Text style={styles.sectionTitle}>운동 기록</Text><Text style={styles.sectionDescription}>GPT/Codex에 첨부할 수 있는 JSON 파일로 전체 기록을 공유합니다.</Text><PrimaryButton title={sessions.length ? `GPT 분석용 기록 공유 (${sessions.length}회)` : 'GPT 분석용 기록 공유'} variant="secondary" loading={exporting} onPress={shareRecords} /></View>
    <View style={styles.dangerSection}><Text style={styles.sectionTitle}>테스트 및 초기화</Text><Text style={styles.sectionDescription}>프로필과 모든 운동 기록을 영구 삭제합니다. 두 번의 확인을 거쳐야 실행됩니다.</Text><Pressable style={styles.reset} onPress={confirmReset}><Text style={styles.resetText}>운동 데이터 전체 초기화</Text></Pressable></View>
  </Screen>;
}

const styles = StyleSheet.create({label:{fontSize:14,fontWeight:'700',color:colors.text,marginBottom:7,marginTop:16},input:{height:52,borderWidth:1,borderColor:colors.border,borderRadius:8,backgroundColor:colors.surface,paddingHorizontal:14,fontSize:17,color:colors.text},levels:{marginBottom:24},levelRow:{minHeight:68,flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:12,borderBottomWidth:1,borderColor:colors.border},selected:{backgroundColor:colors.accent},radio:{width:22,height:22,borderRadius:11,borderWidth:2,borderColor:colors.disabled,alignItems:'center',justifyContent:'center'},radioSelected:{borderColor:colors.primary},dot:{width:10,height:10,borderRadius:5,backgroundColor:colors.primary},levelCopy:{flex:1},levelName:{fontSize:16,fontWeight:'700',color:colors.text},summary:{fontSize:13,color:colors.muted,marginTop:3},dataSection:{marginTop:28,paddingTop:22,borderTopWidth:1,borderColor:colors.border,gap:12},dangerSection:{marginTop:28,paddingTop:22,paddingBottom:20,borderTopWidth:1,borderColor:colors.border},sectionTitle:{fontSize:18,fontWeight:'800',color:colors.text},sectionDescription:{fontSize:14,lineHeight:20,color:colors.muted},reset:{minHeight:50,alignItems:'center',justifyContent:'center',marginTop:12,borderWidth:1,borderColor:colors.danger,borderRadius:8},resetText:{fontSize:15,fontWeight:'700',color:colors.danger}});
