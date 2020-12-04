#!/bin/bash

AWS_PAGER=""

versions=$(aws lambda list-versions-by-function --function-name weather-prod-monthlyAverage | grep 'Version"' | grep -v LATEST | grep -o -E '[0-9]+' | wc -l)

if [[ $versions -gt 1 ]]
then
	last_versions=$(aws lambda list-versions-by-function --function-name weather-prod-monthlyAverage | grep 'Version"' | grep -v LATEST | grep -o -E '[0-9]+' | tail -n2)
	previous_version=$(echo "$last_versions" | head -n1)
	new_version=$(echo "$last_versions" | tail -n1)
	aws lambda delete-alias --function-name weather-prod-monthlyAverage --name production
	aws lambda create-alias --function-name weather-prod-monthlyAverage --name production --function-version $previous_version --routing-config "AdditionalVersionWeights={$new_version=0.5}"
fi

versions=$(aws lambda list-versions-by-function --function-name weather-prod-currentWeather | grep 'Version"' | grep -v LATEST | grep -o -E '[0-9]+' | wc -l)

if [[ $versions -gt 1 ]]
then
	last_versions=$(aws lambda list-versions-by-function --function-name weather-prod-currentWeather | grep 'Version"' | grep -v LATEST | grep -o -E '[0-9]+' | tail -n2)
	previous_version=$(echo "$last_versions" | head -n1)
	new_version=$(echo "$last_versions" | tail -n1)
	aws lambda delete-alias --function-name weather-prod-currentWeather --name production
	aws lambda create-alias --function-name weather-prod-currentWeather --name production --function-version $previous_version --routing-config "AdditionalVersionWeights={$new_version=0.5}"
fi
