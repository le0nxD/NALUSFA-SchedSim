import React, { useMemo } from "react";
import { Download } from "lucide-react";
import { Process, SchedulingResult, SchedulingAlgorithm } from "../types";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import toast from "react-hot-toast";

interface PDFExportProps {
  processes: Process[];
  result: SchedulingResult;
  algorithm: SchedulingAlgorithm;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    margin: 5,
    padding: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#4338ca",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bfbfbf",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
  },
  tableCell: {
    padding: 4,
    flex: 1,
    fontSize: 8,
  },
  ganttChart: {
    marginTop: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  ganttRow: {
    flexDirection: "row",
    height: 20,
    marginVertical: 1,
  },
  ganttBar: {
    height: "100%",
    backgroundColor: "#4338ca",
    marginHorizontal: 1,
  },
  ganttLabel: {
    position: "absolute",
    left: 2,
    top: 2,
    color: "white",
    fontSize: 6,
  },
  timeScale: {
    flexDirection: "row",
    marginTop: 2,
  },
  timeMarker: {
    flex: 1,
    fontSize: 6,
    textAlign: "center",
  },
  stats: {
    marginTop: 10,
    padding: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  statRow: {
    flexDirection: "row",
    marginVertical: 2,
  },
  statLabel: {
    flex: 1,
    fontSize: 8,
    color: "#666",
  },
  statValue: {
    flex: 1,
    fontSize: 8,
    textAlign: "right",
    color: "#4338ca",
  },
  twoColumnLayout: {
    flexDirection: "row",
    gap: 10,
    marginTop: 5,
  },
  column: {
    flex: 1,
  },
});

const getAlgorithmName = (algorithm: SchedulingAlgorithm): string => {
  switch (algorithm) {
    case "FCFS":
      return "First Come First Serve (FCFS)";
    case "SJF":
      return "Shortest Job First (SJF)";
    case "RR":
      return "Round Robin (RR)";
    default:
      return algorithm;
  }
};

const PDFDocument: React.FC<PDFExportProps> = ({
  processes,
  result,
  algorithm,
}) => {
  const totalTime = Math.max(...processes.map((p) => p.completionTime || 0));
  const timeMarkers = Array.from({ length: totalTime + 1 }, (_, i) => i);

  const avgTurnaroundTime =
    processes.length > 0
      ? processes.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) /
        processes.length
      : 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.headerText}>NALUSFA SchedSim</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Laporan Simulasi Penjadwalan CPU</Text>
          <Text style={styles.subtitle}>
            Algoritma: {getAlgorithmName(algorithm)}
          </Text>

          <View style={styles.twoColumnLayout}>
            <View style={styles.column}>
              <Text style={styles.subtitle}>Input Proses</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Nama Proses</Text>
                  <Text style={styles.tableCell}>Waktu Kedatangan</Text>
                  <Text style={styles.tableCell}>Waktu Proses</Text>
                </View>
                {processes.map((process) => (
                  <View key={`input-${process.id}`} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{process.name}</Text>
                    <Text style={styles.tableCell}>{process.arrivalTime}</Text>
                    <Text style={styles.tableCell}>{process.burstTime}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.column}>
              <Text style={styles.subtitle}>Hasil Simulasi</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeader]}>
                  <Text style={styles.tableCell}>Nama Proses</Text>
                  <Text style={styles.tableCell}>Waktu Mulai</Text>
                  <Text style={styles.tableCell}>Waktu Selesai</Text>
                  <Text style={styles.tableCell}>Waktu Penyelesaian</Text>
                  <Text style={styles.tableCell}>Waktu Tunggu</Text>
                </View>
                {processes.map((process) => (
                  <View key={`result-${process.id}`} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{process.name}</Text>
                    <Text style={styles.tableCell}>{process.startTime}</Text>
                    <Text style={styles.tableCell}>
                      {process.completionTime}
                    </Text>
                    <Text style={styles.tableCell}>
                      {process.turnaroundTime}
                    </Text>
                    <Text style={styles.tableCell}>{process.waitingTime}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <Text style={[styles.subtitle, { marginTop: 10 }]}>Gantt Chart</Text>
          <View style={styles.ganttChart}>
            {processes.map((process) => {
              const startPercent = ((process.startTime || 0) / totalTime) * 100;
              const widthPercent =
                (((process.completionTime || 0) - (process.startTime || 0)) /
                  totalTime) *
                100;

              return (
                <View key={process.id} style={styles.ganttRow}>
                  <View
                    style={[
                      styles.ganttBar,
                      {
                        marginLeft: `${startPercent}%`,
                        width: `${widthPercent}%`,
                      },
                    ]}
                  >
                    <Text style={styles.ganttLabel}>{process.name}</Text>
                  </View>
                </View>
              );
            })}

            <View style={styles.timeScale}>
              {timeMarkers.map((time) => (
                <Text key={time} style={styles.timeMarker}>
                  {time}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.stats}>
            <Text style={[styles.subtitle, { marginBottom: 5 }]}>
              Statistik Proses
            </Text>

            <View style={styles.twoColumnLayout}>
              <View style={styles.column}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Total Proses</Text>
                  <Text style={styles.statValue}>{processes.length}</Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Rata-rata Waktu Proses</Text>
                  <Text style={styles.statValue}>
                    {(
                      processes.reduce((sum, p) => sum + p.burstTime, 0) /
                      processes.length
                    ).toFixed(2)}
                  </Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Rata-rata Waktu Tunggu</Text>
                  <Text style={styles.statValue}>
                    {result.averageWaitingTime.toFixed(2)}
                  </Text>
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>
                    Rata-rata Waktu Penyelesaian
                  </Text>
                  <Text style={styles.statValue}>
                    {avgTurnaroundTime.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.statRow}>
                  <Text style={styles.statLabel}>Rentang Waktu Proses</Text>
                  <Text style={styles.statValue}>
                    {`${Math.min(
                      ...processes.map((p) => p.burstTime)
                    )} - ${Math.max(...processes.map((p) => p.burstTime))}`}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

const PDFExport: React.FC<PDFExportProps> = ({
  processes,
  result,
  algorithm,
}) => {
  if (!processes.length) {
    return null;
  }

  const MyDoc = useMemo(
    () => (
      <PDFDocument
        processes={processes}
        result={result}
        algorithm={algorithm}
      />
    ),
    [processes, result, algorithm]
  );

  return (
    <div className="pdf-export-wrapper">
      <PDFDownloadLink
        document={MyDoc}
        fileName={`laporan-penjadwalan-${algorithm.toLowerCase()}.pdf`}
      >
        {({ loading, error }) => (
          <button
            disabled={loading}
            onClick={() => {
              if (error) {
                toast.error("Gagal menghasilkan PDF");
              }
            }}
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-md
              ${
                loading
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              }
              transition-colors duration-200
            `}
          >
            <Download size={18} />
            <span>{loading ? "Membuat PDF..." : "Ekspor PDF"}</span>
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default PDFExport;
