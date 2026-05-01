#!/bin/bash

# Create a script to simulate output and errors
echo "#!/bin/bash" > test_script.sh
echo "echo 'This is standard output'" >> test_script.sh
echo ">&2 echo 'This is standard error'" >> test_script.sh
chmod +x test_script.sh

# Run the test command
./test_script.sh 2> >(tee build-err.log >&2) | tee build.log

# Display the contents of the log files
echo -e "\nContents of build.log:"
cat build.log

echo -e "\nContents of build-err.log:"
cat build-err.log
