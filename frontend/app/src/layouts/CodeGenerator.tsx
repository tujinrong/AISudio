// src/components/CodeGenerator.tsx
import { get } from '../utils/http';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Paper,
  Typography,
  Box,
  Alert,
  SelectChangeEvent,
} from '@mui/material';
import { useLabelLookup } from '../utils/Utils';


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
  programming_language_id: string | null;
  framework_id: string | null;
  database_type_id: string | null;
  frontend_language_id: string | null;
  frontend_library_id: string | null;
}

const CodeGenerator: React.FC = () => {
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
  // const [generatedCode, setGeneratedCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { getLabel } = useLabelLookup();
  useEffect(() => {
    fetchMasterData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const programmingLanguagesData = await get<ProgrammingLanguage[]>('/api/master/programming-languages')
      setProgrammingLanguages(programmingLanguagesData);
      setSelectedProgrammingLanguage(programmingLanguagesData.length > 0 ? programmingLanguagesData[0].id: -1);
      
      const databaseTypesData = await get<DatabaseType[]>('/api/master/database-types')
      setDatabaseTypes(databaseTypesData);
      setSelectedDatabaseType(databaseTypesData.length > 0 ? databaseTypesData[0].id: -1);
      
      const frontendLanguagesData = await get<FrontendLanguage[]>('/api/master/frontend-languages')
      console.log(frontendLanguagesData)
      setFrontendLanguages(frontendLanguagesData);
      setSelectedFrontendLanguage(frontendLanguagesData.length > 0 ? frontendLanguagesData[0].id: -1);
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
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    try {
        let uploadedFileContent: string | null = null;
        const languageName = getLabel(Number(selectedProgrammingLanguage), programmingLanguages);
        const selectedFrameworkName = getLabel(Number(selectedFramework), frameworks);
        const selectedDatabaseTypeName = getLabel(Number(selectedDatabaseType), databaseTypes);
        const selectedFrontendLanguageName = getLabel(Number(selectedFrontendLanguage), frontendLanguages);
        const selectedFrontendLibraryName = getLabel(Number(selectedFrontendLibrary), frontendLibraries);

        if (uploadedFile) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                uploadedFileContent = event.target.result as string;
                const requestData: CodeGenerationRequest = {
                  prompt_text: promptText,
                  uploaded_file_content: uploadedFileContent,
                  programming_language_id: languageName,
                  framework_id: selectedFrameworkName,
                  database_type_id: selectedDatabaseTypeName,
                  frontend_language_id: selectedFrontendLanguageName,
                  frontend_library_id: selectedFrontendLibraryName,
                };
        
                // const data = await post<{ generated_code: string }>('/api/gemini/generate-code', requestData);
                // setGeneratedCode(data.generated_code);
                navigate('/resultCode', { state: { requestData: requestData } });
            };
            reader.readAsText(uploadedFile);
        } else {

          const requestData: CodeGenerationRequest = {
            prompt_text: promptText,
            programming_language_id: languageName,
            framework_id: selectedFrameworkName,
            database_type_id: selectedDatabaseTypeName,
            frontend_language_id: selectedFrontendLanguageName,
            frontend_library_id: selectedFrontendLibraryName,
          };
          // const data = await post<{ generated_code: string }>('/api/gemini/generate-code', requestData);
          // setGeneratedCode(data.generated_code);
          // navigate('/resultCode', { state: { generatedCode: data.generated_code, loading: loading } });
          navigate('/resultCode', { state: { requestData: requestData } });
        }
    } catch (e: Error) {
      setError("システムエラー発生しました。");
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
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CodeGenerator;
