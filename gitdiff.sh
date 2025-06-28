#!/bin/bash

# Process to update the local branch automatically
# To run indefinatly in pm2

update_branch () {
	echo "Remote branch has changes, pulling"
	git pull
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
		exit 1
	}
done

