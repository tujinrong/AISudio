// src/components/CodeGenerator.tsx
import { get, post } from '../utils/http';
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  TextareaAutosize,
  Grid,
  Paper,
  Typography,
  Box,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface ProgrammingLanguage {
  id: number;
  name: string;
  description: string;
}

interface Framework {
  id: number;
  language_id: number;
  name: string;
  description: string;
}

interface DatabaseType {
  id: number;
  name: string;
  description: string;
}

interface FrontendLanguage {
  id: number;
  name: string;
  description: string;
}

interface FrontendLibrary {
  id: number;
  language_id: number;
  name: string;
  description: string;
}

interface CodeGenerationRequest {
  prompt_text: string;
  uploaded_file_content: string | null;
  programming_language_id: number;
  framework_id: number;
  database_type_id: number;
  frontend_language_id: number;
  frontend_library_id: number;
}

const CodeGenerator: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [programmingLanguages, setProgrammingLanguages] = useState<ProgrammingLanguage[]>([]);
  const [frameworks, setFrameworks] = useState<Framework[]>([]);
  const [databaseTypes, setDatabaseTypes] = useState<DatabaseType[]>([]);
  const [frontendLanguages, setFrontendLanguages] = useState<FrontendLanguage[]>([]);
  const [frontendLibraries, setFrontendLibraries] = useState<FrontendLibrary[]>([]);
  const [selectedProgrammingLanguage, setSelectedProgrammingLanguage] = useState<number | ''>('');
  const [selectedFramework, setSelectedFramework] = useState<number | ''>('');
  const [selectedDatabaseType, setSelectedDatabaseType] = useState<number | ''>('');
  const [selectedFrontendLanguage, setSelectedFrontendLanguage] = useState<number | ''>('');
  const [selectedFrontendLibrary, setSelectedFrontendLibrary] = useState<number | ''>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const programmingLanguagesData = await get<ProgrammingLanguage[]>('/api/master/programming-languages')
      console.log(programmingLanguagesData)
      setProgrammingLanguages(programmingLanguagesData);
      
      const databaseTypesData = await get<DatabaseType[]>('/api/master/database-types')
      console.log(databaseTypesData)
      setDatabaseTypes(databaseTypesData);
      
      const frontendLanguagesData = await get<FrontendLanguage[]>('/api/master/frontend-languages')
      console.log(frontendLanguagesData)
      setFrontendLanguages(frontendLanguagesData);
      setError("");

    } catch (e: Error) {
      setError("システムエラー発生しました。");
    }
  };

  useEffect(() => {
    const fetchFrameworks = async () => {
      if (selectedProgrammingLanguage) {
        try {
          const frameworksData = await get<Framework[]>(`/api/master/frameworks/${selectedProgrammingLanguage}`)
          setFrameworks(frameworksData);
          setError("");
        } catch (e: Error) {
          setError("システムエラー発生しました。");
        }
      }
    };

    fetchFrameworks();
  }, [selectedProgrammingLanguage]);

  useEffect(() => {
    const fetchFrontendLibraries = async () => {
      if (selectedFrontendLanguage) {
        try {
          const frontendLibrariesData = await get<FrontendLibrary[]>(`/api/master/frontend-libraries/${selectedFrontendLanguage}`)
          setFrontendLibraries(frontendLibrariesData);
          setError("");
        } catch (e: Error) {
          setError("システムエラー発生しました。");
        }
      }
    };

    fetchFrontendLibraries();
  }, [selectedFrontendLanguage]);


  const handleProgrammingLanguageChange = (event: SelectChangeEvent) => {
    setSelectedProgrammingLanguage(event.target.value as unknown as number);
    setSelectedFramework(''); // Reset framework selection
  };

  const handleFrontendLanguageChange = (event: SelectChangeEvent) => {
    setSelectedFrontendLanguage(event.target.value as unknown as number);
    setSelectedFrontendLibrary(''); // Reset framework selection
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]);
    }
  };
  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
        let uploadedFileContent: string | null = null;

        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                uploadedFileContent = event.target.result as string;

                const requestData: CodeGenerationRequest = {
                    prompt_text: promptText,
                    uploaded_file_content: uploadedFileContent,
                    programming_language_id: Number(selectedProgrammingLanguage),
                    framework_id: Number(selectedFramework),
                    database_type_id: Number(selectedDatabaseType),
                    frontend_language_id: Number(selectedFrontendLanguage),
                    frontend_library_id: Number(selectedFrontendLibrary),
                };

                const data = await post<{ generated_code: string }>('/api/gemini/generate-code', requestData);
                setGeneratedCode(data.generated_code);
            };
            reader.readAsText(uploadedFile);
        } else {
            const requestData: CodeGenerationRequest = {
                prompt_text: promptText,
                uploaded_file_content: uploadedFileContent,
                programming_language_id: Number(selectedProgrammingLanguage),
                framework_id: Number(selectedFramework),
                database_type_id: Number(selectedDatabaseType),
                frontend_language_id: Number(selectedFrontendLanguage),
                frontend_library_id: Number(selectedFrontendLibrary),
            };

            const data = await post<{ generated_code: string }>('/api/gemini/generate-code', requestData);
            setGeneratedCode(data.generated_code);
        }
    } catch (e: Error) {
        setError("システムエラー発生しました。");
      } finally {
        setLoading(false);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h5" gutterBottom>
          generate-code
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <TextField
            size="small"
            label="要件入力"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
          />

          <Box mt={2}>
            <InputLabel id="programming-language-label">開発言語</InputLabel>
            <Select
              size="small"
              labelId="programming-language-label"
              id="programming-language-select"
              value={selectedProgrammingLanguage}
              label="開発言語"
              onChange={handleProgrammingLanguageChange}
              fullWidth
              margin="normal"
            >
              {programmingLanguages.map((language) => (
                <MenuItem key={language.id} value={language.id}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box mt={2}>
            <InputLabel id="framework-label">フレームワーク</InputLabel>
            <Select
              size="small"
              labelId="framework-label"
              id="framework-select"
              value={selectedFramework}
              label="フレームワーク"
              onChange={(e) => setSelectedFramework(e.target.value as number)}
              fullWidth
              margin="normal"
              disabled={!selectedProgrammingLanguage}
            >
              {frameworks.map((framework) => (
                <MenuItem key={framework.id} value={framework.id}>
                  {framework.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box mt={2}>
            <InputLabel id="database-type-label">データベース</InputLabel>
            <Select
              size="small"
              labelId="database-type-label"
              id="database-type-select"
              value={selectedDatabaseType}
              label="データベース"
              onChange={(e) => setSelectedDatabaseType(e.target.value as number)}
              fullWidth
              margin="normal"
            >
              {databaseTypes.map((dbType) => (
                <MenuItem key={dbType.id} value={dbType.id}>
                  {dbType.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box mt={2}>
            <InputLabel id="frontend-language-label">Front開発言語</InputLabel>
            <Select
              size="small"
              labelId="frontend-language-label"
              id="frontend-language-select"
              value={selectedFrontendLanguage}
              label="Front開発言語"
              onChange={handleFrontendLanguageChange}
              fullWidth
              margin="normal"
            >
              {frontendLanguages.map((language) => (
                <MenuItem key={language.id} value={language.id}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

           <Box mt={2}>
            <InputLabel id="frontend-library-label">Frontフレームワーク</InputLabel>
            <Select
              size="small"
              labelId="frontend-library-label"
              id="frontend-library-select"
              value={selectedFrontendLibrary}
              label="Frontフレームワーク"
              onChange={(e) => setSelectedFrontendLibrary(e.target.value as number)}
              fullWidth
              margin="normal"
              disabled={!selectedFrontendLanguage}
            >
              {frontendLibraries.map((library) => (
                <MenuItem key={library.id} value={library.id}>
                  {library.name}
                </MenuItem>
              ))}
            </Select>
          </Box>


          <Box mt={2}>
            <Typography variant="subtitle1">ファイルアップロード</Typography>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ marginTop: 8 }}
            />
          </Box>

          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              コード生成
            </Button>
          </Box>
          {loading && <CircularProgress />}
          {generatedCode && (
            <Box mt={3}>
              <Typography variant="h6">生成したコード</Typography>
              <TextareaAutosize
                style={{ width: '100%', minHeight: 200, padding: 8 }}
                value={generatedCode}
                readOnly
              />
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CodeGenerator;
