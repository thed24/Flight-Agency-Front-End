REGION=asia-southeast2
PROJECT_ID=flight-agency-api

API_URL=$(gcloud run services describe $PROJECT_ID --region $REGION --format 'value(status.url)')
echo $API_URL > /workspace/api_key
