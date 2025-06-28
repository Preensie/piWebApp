#!/bin/bash

### NOTE - Updating git diff could break the deployment on the pi

# Process to update the local branch automatically
# To run indefinatly in pm2

update_branch () {
	echo "Remote branch has changes, pulling"

	cd /home/pi/Documents
	rm -rf piWebApp

	git clone https://github.com/Preensie/piWebApp

	cd piWebApp 

	npm install

	# Update deployment
	pm2 delete index
	pm2 start index.js
}

while :
do
	git fetch -v --dry-run 2>&1 |
	 grep -qE "\[up\s+to\s+date\]\s+$(
       	 git branch 2>/dev/null |
        	   sed -n '/^\*/s/^\* //p' |
        	        sed -r 's:(\+|\*|\$):\\\1:g'
   	 )\s+" || {
        	update_branch
	}
done

