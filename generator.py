import sys
from textgenrnn import textgenrnn
textgen = textgenrnn(weights_path='rnn_weights.hdf5',
                       vocab_path='rnn_vocab.json',
                       config_path='rnn_config.json')

print(textgen.generate(return_as_list=False, max_gen_length=500))
sys.stdout.flush()
