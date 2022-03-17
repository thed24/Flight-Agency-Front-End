REGION=us-east1
DEVSHELL_PROJECT_ID=sample-proj

API_URL=gcloud run services describe flight-agency-api --region asia-southeast2 --format 'value(status.url)'
echo $API_URL > /workspace/api_key