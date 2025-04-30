import { useState, useEffect } from "react";
import MainLayout from '../layouts/MainLayout';
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { post } from '../utils/http';
import LoadingScreen from '../components/LoadingScreen'
type Chunk = { type: 'text' | 'code', content: string, language?: string };

const parseMarkdownChunks = (md: string): Chunk[] => {
  const regex = /```(\w+)?\n([\s\S]+?)```/g;
  const chunks: Chunk[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(md)) !== null) {
    if (match.index > lastIndex) {
      chunks.push({ type: 'text', content: md.slice(lastIndex, match.index).trim() });
    }
    chunks.push({ type: 'code', language: match[1], content: match[2] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < md.length) {
    chunks.push({ type: 'text', content: md.slice(lastIndex).trim() });
  }
  return chunks;
};

const ResultCode = () => {
  const location = useLocation();
  const requestData = location.state?.requestData || '';
  const [chunks, setChunks] = useState<Chunk[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGeneratedCode = async () => {
      try {
        const res = await post<{ generated_code: string }>(
          '/api/gemini/generate-code',
          requestData
        );
        const result = parseMarkdownChunks(res.generated_code);
        setChunks(result);
      } catch (e) {
        setChunks([{ type: 'text', content: 'エラーが発生しました。' }]);
      } finally {
        setLoading(false);
      }
    };
  
    if (requestData) {
      setLoading(true);
      setChunks([])
      fetchGeneratedCode();
    }
  }, [requestData]);
  
  // useEffect(() => {
  //   if (generatedCode) {
  //     const result = parseMarkdownChunks(generatedCode);
  //     setChunks(result);
  //   }
  //   setLoading(false);
  // }, [generatedCode]);

  return (
    <MainLayout>
      <Box p={1}>
        {loading && <LoadingScreen />}
        <Box mt={1} display="flex" flexDirection="column" gap={3}>
          {chunks.map((chunk, i) =>
            chunk.type === 'text' ? (
              <Typography key={i} variant="body1">{chunk.content}</Typography>
            ) : (
              <Box key={i} position="relative" bgcolor="#f5f5f5" borderRadius={2} p={4}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => navigator.clipboard.writeText(chunk.content)}
                  sx={{ position: "absolute", top: 2, right: 2 }}
                >
                  Copy
                </Button>
                {chunk.language === "html" ? (
                  <>
                    <Typography variant="caption">HTML プレビュー：</Typography>
                    <Box dangerouslySetInnerHTML={{ __html: chunk.content }} sx={{ border: "1px solid #ccc", mt: 1, p: 1 }} />
                  </>
                ) : null}
                <SyntaxHighlighter language={chunk.language} style={materialLight}>
                  {chunk.content}
                </SyntaxHighlighter>
              </Box>
            )
          )}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default ResultCode;
