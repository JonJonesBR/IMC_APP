"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Save, Trash2, Activity } from "lucide-react";

interface IMCRecord {
  id: string;
  peso: number;
  altura: number;
  imc: number;
  categoria: string;
  data: string;
}

interface IMCResult {
  imc: number;
  categoria: string;
  descricao: string;
  cor: string;
}

export default function Home() {
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [resultado, setResultado] = useState<IMCResult | null>(null);
  const [erro, setErro] = useState<string>("");
  const [historico, setHistorico] = useState<IMCRecord[]>([]);

  useEffect(() => {
    const savedHistorico = localStorage.getItem("imcHistorico");
    if (savedHistorico) {
      setHistorico(JSON.parse(savedHistorico));
    }
  }, []);

  const validarEntrada = (): boolean => {
    setErro("");
    
    if (!peso || !altura) {
      setErro("Por favor, preencha todos os campos.");
      return false;
    }
    
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    
    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      setErro("Por favor, insira valores numéricos válidos.");
      return false;
    }
    
    if (pesoNum <= 0 || pesoNum > 500) {
      setErro("O peso deve estar entre 1 e 500 kg.");
      return false;
    }
    
    if (alturaNum <= 0 || alturaNum > 3) {
      setErro("A altura deve estar entre 0.1 e 3 metros.");
      return false;
    }
    
    return true;
  };

  const calcularIMC = (): IMCResult => {
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const imc = pesoNum / (alturaNum * alturaNum);
    
    let categoria = "";
    let descricao = "";
    let cor = "";
    
    if (imc < 18.5) {
      categoria = "Abaixo do peso";
      descricao = "Você está abaixo do peso ideal. Consulte um nutricionista.";
      cor = "bg-blue-100 text-blue-800 border-blue-200";
    } else if (imc < 25) {
      categoria = "Peso normal";
      descricao = "Parabéns! Você está no peso ideal.";
      cor = "bg-green-100 text-green-800 border-green-200";
    } else if (imc < 30) {
      categoria = "Sobrepeso";
      descricao = "Você está com sobrepeso. Considere fazer exercícios e reavaliar sua dieta.";
      cor = "bg-yellow-100 text-yellow-800 border-yellow-200";
    } else if (imc < 35) {
      categoria = "Obesidade Grau I";
      descricao = "Obesidade leve. Procure orientação médica.";
      cor = "bg-orange-100 text-orange-800 border-orange-200";
    } else if (imc < 40) {
      categoria = "Obesidade Grau II";
      descricao = "Obesidade moderada. Busque ajuda profissional.";
      cor = "bg-red-100 text-red-800 border-red-200";
    } else {
      categoria = "Obesidade Grau III";
      descricao = "Obesidade grave. Procure um médico urgentemente.";
      cor = "bg-red-200 text-red-900 border-red-300";
    }
    
    return { imc, categoria, descricao, cor };
  };

  const handleCalcular = () => {
    if (!validarEntrada()) return;
    
    const resultadoIMC = calcularIMC();
    setResultado(resultadoIMC);
    
    const novoRegistro: IMCRecord = {
      id: Date.now().toString(),
      peso: parseFloat(peso),
      altura: parseFloat(altura),
      imc: resultadoIMC.imc,
      categoria: resultadoIMC.categoria,
      data: new Date().toLocaleDateString('pt-BR')
    };
    
    const novoHistorico = [novoRegistro, ...historico.slice(0, 9)];
    setHistorico(novoHistorico);
    localStorage.setItem("imcHistorico", JSON.stringify(novoHistorico));
  };

  const handleLimpar = () => {
    setPeso("");
    setAltura("");
    setResultado(null);
    setErro("");
  };

  const handleLimparHistorico = () => {
    setHistorico([]);
    localStorage.removeItem("imcHistorico");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Calculadora de IMC
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Calcule seu Índice de Massa Corporal e acompanhe sua evolução
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calcular IMC
              </CardTitle>
              <CardDescription>
                Insira seu peso e altura para calcular seu IMC
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="peso">Peso (kg)</Label>
                <Input
                  id="peso"
                  type="number"
                  placeholder="Ex: 70"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  step="0.1"
                  min="0.1"
                  max="500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="altura">Altura (m)</Label>
                <Input
                  id="altura"
                  type="number"
                  placeholder="Ex: 1.75"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  step="0.01"
                  min="0.1"
                  max="3"
                />
              </div>

              {erro && (
                <Alert variant="destructive">
                  <AlertDescription>{erro}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button onClick={handleCalcular} className="flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular
                </Button>
                <Button onClick={handleLimpar} variant="outline">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
              <CardDescription>
                Seu Índice de Massa Corporal
              </CardDescription>
            </CardHeader>
            <CardContent>
              {resultado ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {resultado.imc.toFixed(1)}
                    </div>
                    <Badge className={`${resultado.cor} text-sm px-3 py-1`}>
                      {resultado.categoria}
                    </Badge>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {resultado.descricao}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Faixas de IMC:</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Abaixo do peso:</span>
                        <span className="font-mono">&lt; 18.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Peso normal:</span>
                        <span className="font-mono">18.5 - 24.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sobrepeso:</span>
                        <span className="font-mono">25.0 - 29.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Obesidade Grau I:</span>
                        <span className="font-mono">30.0 - 34.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Obesidade Grau II:</span>
                        <span className="font-mono">35.0 - 39.9</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Obesidade Grau III:</span>
                        <span className="font-mono">≥ 40.0</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Insira seus dados e clique em "Calcular"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {historico.length > 0 && (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Histórico de Cálculos</CardTitle>
                  <CardDescription>
                    Últimos 10 cálculos salvos
                  </CardDescription>
                </div>
                <Button onClick={handleLimparHistorico} variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar Histórico
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {historico.map((registro) => (
                  <div
                    key={registro.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-medium">{registro.peso}kg</span>
                          <span className="text-gray-500 mx-2">×</span>
                          <span className="font-medium">{registro.altura}m</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          IMC: {registro.imc.toFixed(1)}
                        </Badge>
                        <Badge 
                          className={`text-xs ${
                            registro.categoria === "Abaixo do peso" ? "bg-blue-100 text-blue-800 border-blue-200" :
                            registro.categoria === "Peso normal" ? "bg-green-100 text-green-800 border-green-200" :
                            registro.categoria === "Sobrepeso" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                            registro.categoria === "Obesidade Grau I" ? "bg-orange-100 text-orange-800 border-orange-200" :
                            registro.categoria === "Obesidade Grau II" ? "bg-red-100 text-red-800 border-red-200" :
                            "bg-red-200 text-red-900 border-red-300"
                          }`}
                        >
                          {registro.categoria}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {registro.data}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sobre o IMC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <p>
                O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular 
                se uma pessoa está no peso ideal. Desenvolvido pelo polímata Lambert Quételet 
                no século XIX, é um método simples e rápido para avaliação do peso corporal.
              </p>
              <p>
                <strong>Fórmula:</strong> IMC = Peso (kg) ÷ Altura² (m)
              </p>
              <p>
                <strong>Importante:</strong> O IMC é uma ferramenta de triagem e não considera 
                fatores como composição corporal, massa muscular, idade e sexo. Consulte sempre 
                um profissional de saúde para uma avaliação completa.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}