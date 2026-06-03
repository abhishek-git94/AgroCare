def process_text(text: str, language: str = "hi") -> dict:
    """Perform NLP analysis for local language crop conversation."""
    # TODO: implement IndicBERT or equivalent text understanding pipeline
    return {
        "detected_language": language,
        "spoken_response_text": "आपकी जानकारी के लिए धन्यवाद। आपकी फसल के बारे में विस्तृत विश्लेषण तैयार किया जा रहा है।",
        "action_triggered": "analyze_query",
    }
