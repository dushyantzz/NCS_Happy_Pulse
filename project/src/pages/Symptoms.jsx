import { useState } from 'react';
import { Search, AlertCircle, ThermometerSnowflake } from 'lucide-react';

const commonSymptoms = [
  { name: 'Fever', severity: 'moderate', urgency: 'medium', description: 'A high body temperature, often caused by infection.' },
  { name: 'Headache', severity: 'mild', urgency: 'low', description: 'Pain or discomfort in the head, often due to stress or tension.' },
  { name: 'Cough', severity: 'mild', urgency: 'low', description: 'A reflex action to clear the throat and airways.' },
  { name: 'Shortness of Breath', severity: 'severe', urgency: 'high', description: 'A feeling of not being able to breathe deeply.' },
  { name: 'Fatigue', severity: 'mild', urgency: 'low', description: 'A general sense of tiredness or lack of energy.' },
  { name: 'Body Aches', severity: 'moderate', urgency: 'medium', description: 'Pain in muscles or joints, often a sign of an underlying infection.' },
];

const Symptoms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [symptomHistory, setSymptomHistory] = useState([]);

  const filteredSymptoms = commonSymptoms.filter(symptom =>
    symptom.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSymptomClick = (symptom) => {
    setSelectedSymptom(symptom);
    setSymptomHistory((prevHistory) => [...prevHistory, symptom.name]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Symptom Checker</h1>
          <p className="text-xl text-gray-600">Identify and understand your symptoms</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-gray-400"
              >
                X
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Common Symptoms</h2>
            <div className="space-y-4">
              {filteredSymptoms.map((symptom, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 hover:border-blue-400 ${
                    selectedSymptom === symptom
                      ? 'border-blue-400 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => handleSymptomClick(symptom)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{symptom.name}</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${getSeverityColor(symptom.severity)}`}>
                      {symptom.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Emergency Symptoms</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="font-medium text-red-700">Seek immediate medical attention if you experience:</span>
              </div>
              <ul className="list-disc list-inside text-red-600 space-y-2">
                <li>Difficulty breathing or shortness of breath</li>
                <li>Chest pain or pressure</li>
                <li>Sudden confusion or difficulty speaking</li>
                <li>Severe abdominal pain</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <ThermometerSnowflake className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium text-blue-700">Track your symptoms</span>
              </div>
              <p className="text-blue-600">
                Keep a record of your symptoms, including when they started and any changes in severity.
                This information will be valuable for your healthcare provider.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Symptom Details */}
        {selectedSymptom && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Symptom Details</h2>
            <p className="text-lg font-medium">{selectedSymptom.name}</p>
            <p className="text-gray-600">{selectedSymptom.description}</p>
          </div>
        )}

        {/* Symptom History */}
        {symptomHistory.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Symptom History</h2>
            <ul className="space-y-2">
              {symptomHistory.map((symptom, index) => (
                <li key={index} className="text-gray-700">
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Symptoms;



