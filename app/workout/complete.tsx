import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '@/components/PrimaryButton';
import { Screen } from '@/components/Screen';
import { colors } from '@/constants/theme';
import { useAppData } from '@/context/AppDataContext';
import { completedSetCount, WorkoutEffort } from '@/domain/types';

const EFFORTS: [WorkoutEffort, string][] = [['easy', '쉬움'], ['moderate', '적당함'], ['hard', '어려움']];

export default function CompleteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sessions, updateSession } = useAppData();
  const session = sessions.find((item) => item.id === id);
  const setEffort = (effort: WorkoutEffort) => { if (session) void updateSession({ ...session, effort }); };
  return <Screen contentStyle={styles.screen}>
    <View><View style={styles.hero}><View style={styles.icon}><Ionicons name="checkmark" size={42} color="#FFF" /></View><Text style={styles.title}>오늘 운동 완료</Text><Text style={styles.subtitle}>정해진 루틴을 모두 마쳤습니다.</Text></View>
      <View style={styles.results}>{session?.exercises.map((result) => <View key={result.exercise.id} style={styles.row}><Ionicons name="checkmark-circle" size={22} color={colors.primary} /><Text style={styles.name}>{result.exercise.name}</Text><Text style={styles.count}>{completedSetCount(result)}/{result.exercise.totalSets}세트</Text></View>)}</View>
      <Text style={styles.effortTitle}>오늘 강도는 어땠나요? (선택)</Text><View style={styles.efforts}>{EFFORTS.map(([value, label]) => <Pressable key={value} onPress={() => setEffort(value)} style={[styles.effort, session?.effort === value && styles.effortSelected]}><Text style={[styles.effortText, session?.effort === value && styles.effortTextSelected]}>{label}</Text></Pressable>)}</View>
    </View><View style={styles.buttons}><PrimaryButton title="홈으로" onPress={() => router.replace('/')} /><PrimaryButton title="기록 보기" variant="secondary" onPress={() => router.replace('/history')} /></View>
  </Screen>;
}

const styles = StyleSheet.create({screen:{justifyContent:'space-between'},hero:{alignItems:'center',marginTop:24},icon:{width:70,height:70,borderRadius:35,alignItems:'center',justifyContent:'center',backgroundColor:colors.primary},title:{fontSize:29,fontWeight:'800',color:colors.text,marginTop:16},subtitle:{fontSize:16,color:colors.muted,marginTop:7},results:{marginTop:24,borderTopWidth:1,borderColor:colors.border},row:{minHeight:58,flexDirection:'row',alignItems:'center',gap:10,borderBottomWidth:1,borderColor:colors.border},name:{flex:1,fontSize:16,fontWeight:'700',color:colors.text},count:{fontSize:14,color:colors.muted},effortTitle:{fontSize:15,fontWeight:'700',color:colors.text,marginTop:22},efforts:{flexDirection:'row',gap:8,marginTop:10},effort:{flex:1,minHeight:44,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:colors.border,borderRadius:8,backgroundColor:colors.surface},effortSelected:{backgroundColor:colors.primary,borderColor:colors.primary},effortText:{fontWeight:'700',color:colors.text},effortTextSelected:{color:'#FFF'},buttons:{gap:10,marginTop:22}});
